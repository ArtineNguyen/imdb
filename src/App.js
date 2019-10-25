import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap/'
import './App.css';

function App() {
  const [film, getFilm] = useState(null)
  const [pageNumber, setpageNumber] = useState(1);

  const getData = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?page=${pageNumber}&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=4c5b4a5e627748117d4b24082672a9b4`;
    const reponse = await fetch(url);
    const data = await reponse.json();
    // const newMovieData = film.concat(data.results)
    getFilm(data.results);
    setpageNumber(pageNumber + 1 )
  };
  
  useEffect(() => {
    getData()
  }, []);
  console.log(film);
  console.log (pageNumber);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        <div className="row">
          <h1>Movie Title</h1>
          {film && film.map(f => {
            return (
              <div className="col-md-4">
                <div className="card mb-4 box-shadow" style={{ width: "18rem" }}>
                  <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${f.poster_path}`} alt="Card image cap" />
                  <div className="card-body">
                    <p className="card-text">{f.title}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      {f.overview}
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">More Info</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">{f.popularity}</button>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={() => getData()}>Get More</button>
      </div>
    </div>
  );
};

export default App;