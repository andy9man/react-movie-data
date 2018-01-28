import React, { Component } from 'react';
import axios from 'axios';
import './ui-toolkit/css/nm-cx/main.css';
import './App.css';

const getMovieObject = (movieData) => {
  console.log(movieData);
  console.log("In get movie object..." + movieData.data.Title);
  return {
    title: movieData.data.Title,
    poster: movieData.data.Poster.includes("http") ? movieData.data.Poster : "images/not-available.jpg",
    year: movieData.data.Year,
    plot: movieData.data.Plot,
    director: movieData.data.Director
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      result: '',
      error: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieInfo = this.getMovieInfo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const movie = this.getMovieInfo(this.state.search);
    console.log(movie);
  }

  handleInput(e) {
    this.setState( {search: e.target.value} );
  }

  getMovieInfo(movieSearch) {
    axios.get('http://www.omdbapi.com/?t=' + movieSearch + '&apikey=26dd002e')
    .then( response => {
      console.log("Display movie...")
      const stateObject = response.data.Response.toLowerCase() === 'true' ? {result: getMovieObject(response)} : {result: '', error: 'We could not find any results for ... ' + movieSearch};
      console.log(stateObject);
      this.setState( {...stateObject, search: ''} );
    })
    .catch( error => {
      console.log('We had an issue with: ' + this.state.movie);
      this.setState( {results: '', error: error} );
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="margin-vert-xlarge padding-vert-large padding-horiz-xlarge text-center">Movie Data</h1>
        </header>

          {/* -- BIG MOVE COMPONENT -- */}
          <div className="row">
            {/* -- Search Movie Size -- */}
            <div className="xlarge-4 large-4 small-12 medium-6 columns">
              <div className="row">
                <form onSubmit={this.handleSubmit} >
                  <div className="columns medium-9 small-9 md-text-field with-floating-label">
                    <input
                      id="search"
                      type="text"
                      value={this.state.search}
                      onInput={this.handleInput}
                      required
                    />
                    <label htmlFor="search">Movie Search</label>
                  </div>
                  <div className="columns medium-3 small-3">
                    <button
                      className="button btn-cta expand"
                      type="submit"
                    >Search</button>
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="small-12 columns">
                  <span className="error">{this.state.error}</span>
                </div>
              </div>
            </div>

            {/* -- Movie Results Size -- */}
            <div
              style={this.state.result === '' ? {visibility: 'hidden'} : {visibility: 'visible'} }
              className="xlarge-6 large-6 medium-6 columns valign-top"
            >
              <div className="row">

                {/* -- Movie Poster -- */}
                <div className="small-3 columns">
                  <img src={this.state.result.poster} alt={this.state.result.title + " Movie Poster"} />
                </div>

                {/* -- Movie Details -- */}
                <div className="small-9 columns">

                  <div className="row collapse">
                    <div className="small-12 text-center">
                      <h3 style={ {fontWeight: 'bold', color: '#002B49'} }>{this.state.result.title}</h3>
                    </div>
                  </div>

                  <div className="row">
                    <div className="small-3 columns"><b>Year</b></div>
                    <div className="small-9 columns">{this.state.result.year}</div>
                  </div>
                  <div className="row">
                    <div className="small-3 columns"><b>Director</b></div>
                    <div className="small-9 columns">{this.state.result.director}</div>
                  </div>
                  <div className="row">
                    <div className="small-3 columns"><b>Plot</b></div>
                    <div className="small-9 columns">{this.state.result.plot}</div>
                  </div>

                </div>
              </div>

            </div>
          </div>
      </div>
    );
  }
}

export default App;
