import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Header from './Header';

class MyMovies extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                <Header/>
                    {this.props.savedmovies.length > 0 ? this.props.savedmovies.map(item =>
                        <Card className={'cardRoot'}>
                            <CardActionArea>
                                <CardMedia
                                    className={'media'}
                                    image={item.Poster}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.Title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.Year}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ) :
                    <p className="headerWelcome">No movies selected</p> 
                    }
                </Grid>
            </Grid>
            )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(MyMovies);