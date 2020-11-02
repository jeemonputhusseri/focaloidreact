import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from 'react-redux';
import savemovies from '../Action/savemovies';
import Header from './Header';

const headCells = [
    { id: 'Poster', numeric: false, label: 'Poster' },
    { id: 'Title', numeric: false, label: 'Title' },
    { id: 'Year', numeric: true, label: 'Year' },
    { id: 'imdbID', numeric: false, label: 'ID' },
]


class MoviesSearch extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            year: null,
            data: [],
            selected: [],
            page: 0,
            rowsPerPage: 10,
            totalResults: 0,
            savedMovies:[]
        }
    }


    search = () => {
        this.setState({
            page: 0
        }, () => {
            this.callSearchApi();
        })
    }


    callSearchApi = () => {
        const { title, year, page } = this.state;
        let pageNumber = page + 1;
        axios({
            url: `http://www.omdbapi.com/?apikey=c7256108&type=movie&s=${title}&y=${year}&page=${pageNumber}`,
            method: 'GET'
        })
            .then(res => {
                res.data.Response == 'True' && res.data.Search && this.setState({
                    data: res.data.Search,
                    totalResults: res.data.totalResults
                })
                res.data.Response == 'False' && alert(res.data.Error)
            })
    }


    saveMovies = () => {
        const {selected, data} = this.state;
        let newData = data.filter(item => selected.includes(item.imdbID))
        this.setState({
            savedMovies:newData
        }, () => {
            this.props.savemovies(this.state.savedMovies)
        })
    }

    handleSelectAllClick = (event) => {
        const { data } = this.state;
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.imdbID);
            this.setState({
                selected: newSelecteds
            });
            return;
        }

        this.setState({
            selected: []
        }, () => {
            this.saveMovies()
        });
    };

    handleClick = (event, imdbID) => {
        let { selected } = this.state;
        const selectedIndex = selected.indexOf(imdbID);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, imdbID);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({
            selected: newSelected
        }, () => {
            this.saveMovies()
        });
    };

    handleChange = (field, value) => {
        this.state[field] = value;
        this.setState({})
        switch (field) {
            case 'title': this.setState({ title: value }); break;
            case 'year': this.setState({ year: value }); break;
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        }, () => {
            this.callSearchApi();
        })
    }


    render() {
        const { data, selected, page, rowsPerPage, totalResults } = this.state;
        let rowCount = data.length;
        let numSelected = selected.length;
        const isSelected = (name) => selected.indexOf(name) !== -1;
        return <Grid container>
            <Grid item xs={12}>
                <Header/>

                <div className="middle">
                <TextField
                    label='Title'
                    onChange={(e) => this.handleChange('title', e.target.value)}
                    variant="outlined"
                    style={{"margin-right":"8px"}}
                />
                <TextField
                    label='Year'
                    onChange={(e) => this.handleChange('year', e.target.value)}
                    variant="outlined"
                    style={{"margin-right":"8px"}}
                />
                <Button
                    onClick={this.search}
                    variant='outlined'
                    className="button"
                    style={{"height":"54px"}}
                >Search</Button>
                </div>

                <TableContainer className="tablecontainer">
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={numSelected > 0 && numSelected < rowCount}
                                        checked={rowCount > 0 && numSelected === rowCount}
                                        onChange={this.handleSelectAllClick}
                                    />
                                </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((row, index) => {
                                const isItemSelected = isSelected(row.imdbID);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => this.handleClick(event, row.imdbID)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.imdbID}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {<img width="26" src={row.Poster} />}
                                        </TableCell>
                                        <TableCell align="left">{row.Title}</TableCell>
                                        <TableCell align="right">{row.Year}</TableCell>
                                        <TableCell align="left">{row.imdbID}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
                {totalResults ? <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={totalResults}
                    rowsPerPage={10}
                    page={page}
                    onChangePage={this.handleChangePage}
                /> : ''}
            </Grid>
        </Grid>
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    savemovies: (payload) => dispatch(savemovies(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesSearch);