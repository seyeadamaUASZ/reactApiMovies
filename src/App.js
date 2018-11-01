import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow'
import $ from 'jquery'

class App extends Component {
    
  constructor(props){
    super(props)
    this.state={}
    //console.log('initializer !!!')

    /*const movies =[
      {id: 0, poster_src:"favicon.ico", title: "Avengers: infinity war", overview: "my first avenger view"},
      { id: 1, poster_src:"favicon.ico", title: "Avengers", overview: "my second avenger view" }
    ]

  
    var movieRows = []
    movies.forEach((movie)=>{
      console.log(movie.title)
      const movieRow=<MovieRow movie={movie}/>
      movieRows.push(movieRow)
    })
    this.state={rows: movieRows}*/
    this.performSearch("avengers")
  }

  performSearch(searchTerm){
    console.log('searching ......')
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=3b42842531375175c3c2fda49f5255ae&language=fr&query="+searchTerm
    $.ajax({
        url: urlString,
        success:(resultSearch)=>{
             console.log("fetching data successfully")
             const results = resultSearch.results
             console.log(results[0])
             var movieRows = []

             results.forEach((movie)=> {
               movie.poster_src = "https://image.tmdb.org/t/p/w185"+movie.poster_path
               console.log(movie.title)
               const movieRow = <MovieRow key={movie.id} movie={movie}/>
               movieRows.push(movieRow)
             });

             this.setState({rows:movieRows})
        },
        error:(xhr,status,err)=>{
          console.error('failed to fetch data')
        }
    })
  }

  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchTerm= event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon react" width="50" src="favicon.ico"/>
              </td>
              <td width="8"/>
              <td>
               <h3>MoviesDB Search </h3>
              </td>
            </tr>
          </tbody>
        </table>
        <input style={{
          fontSize:24,
          display:'block',
          width:"99%",
          paddingTop:8,
          paddingBottom:8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter your term search"/>

        {this.state.rows}
      </div>
    );
  }
}

export default App;
