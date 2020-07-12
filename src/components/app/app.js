import React, {Component} from 'react';


import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    maxId = 100

  state = {

      todoData: [
          this.createTodoItem('Drink'),
          this.createTodoItem('Make')
        ],
      term: '',
      searchBy: ''
  }

  createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
  }

  deleteItem = (id) => {
      this.setState(({todoData}) => {
          const idx = todoData.findIndex((el) => el.id === id)
          const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx+1)]
          return {
            todoData: newArr
          }
      })
  }

  addItem = (text) => {
      const newItem = this.createTodoItem(text)
      this.setState(({todoData}) => {
          const newArr = [
              ...todoData,
              newItem
          ]
          return {
              todoData: newArr
          }
      })
  }

  toggleProperty(arr,id, propName) {
      const idx = arr.findIndex((el) => el.id === id)
      const oldItem = arr[idx]
      const newItem = {...oldItem, [propName]: !oldItem[propName]}
      return [...arr.slice(0, idx), newItem,...arr.slice(idx+1)]
  }

  onToggleImportant = (id) => {
      this.setState(({todoData}) => {
          return {
              todoData: this.toggleProperty(todoData, id , 'important')
          }
      })
  }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id , 'done')
            }
        })
    }


    onSearch = (text) => {
     this.setState({term:text})
    }

    search(items, term) {
        if (term.length === 0 ) {
            return items
        }
        return  items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) >  -1
        })
    }

    searchBy(items, by) {
        switch (by) {
            case 'All':
                return items;
            case 'Active':
                return items.filter((item) => {
                    return item.done !== true
                })
            case 'Done':
                return items.filter((item) => {
                    return item.done === true
                })
            default:
                return items
        }
    }

    onSearchBy = (status) => {
        this.setState({searchBy: status})
    }

  render() {

        const {todoData, term, searchBy} = this.state

      const visibleItems = this.search(todoData, term)
        const searchedBy = this.searchBy(visibleItems, searchBy)
        const doneCount = todoData.filter((item) => item.done).length
        const todoCount = todoData.length - doneCount
      return (
          <div className="todo-app">
              <AppHeader toDo={todoCount} done={doneCount} />
              <div className="top-panel d-flex">
                  <SearchPanel onSearch={this.onSearch}/>
                  <ItemStatusFilter onSearchBy={this.onSearchBy} filter={searchBy}/>
              </div>

              <TodoList todos={searchedBy}
                        onDeleted={ this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleDone={this.onToggleDone}/>

              <ItemAddForm onItemAdded={this.addItem}/>
          </div>
      );
  }
};

