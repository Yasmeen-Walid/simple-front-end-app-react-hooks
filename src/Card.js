import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { FormControl } from '@material-ui/core';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  avatar: {
    backgroundColor: "#c51162",
  },
}));


const Cards = () => {

    //create the state using hooks
    const [news, setNews] = useState([]);
    const [searchQuery, setSearch] = useState('react');
    const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');

    // fetch news
    const fetchNews = () => {
        fetch(url)
        .then(result => result.json())
        //.then(data => console.log(data))
        .then(data => setNews(data.hits))
        .catch(error => console.log(error))
    }

    //to run featchNews method I will use useEffect 
    useEffect(() => {
        fetchNews();
    } ,
    //to just call useEffect once when the url chang
    [url]
    )

  
    const handelChange = (e) => {
      setSearch(e.target.value);
    }

    const handelSubmit = (e) => {
      e.preventDefault();
      setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    }
    const classes = useStyles();

    return (
        <div style={{backgroundColor: "#dd33fa"}} >

            <FormControl style={{ display:'block', justifyContent:'center', padding: "50px 25px"}}  >
             <TextField id="outlined-search" label="Search field" type="search" variant="outlined"  value = {searchQuery} onChange = {handelChange} style = {{  backgroundColor: "white"}} />
             <IconButton color="primary" aria-label="search"  onClick = {handelSubmit} >
                <SearchIcon />
              </IconButton>
            </FormControl>

            <div style={{ display:'flex', justifyContent:'center' }}>
            <Typography variant="h2" style = {{color :"white"}}>
             News
            </Typography>
            </div>
            
            <div style={{ display:'flex', justifyContent:'center', padding: "5px 25px" }}>
              <Card className={classes.root} >
                  {news && news.map((n, index) => (
                      <dive key = {index}>
                          <CardHeader
                          avatar={
                              <Avatar aria-label="recipe" className={classes.avatar}>
                              </Avatar>
                            }
                          action={
                              <IconButton aria-label="settings">
                              <MoreVertIcon />
                              </IconButton>
                          }
                          title =  {n.author}
                          
                          subheader = {n.created_at.slice(0,10)}
                          />
                          <CardContent>
                          <Typography variant="body2" component="p">
                              {n.title}
                          </Typography>
                          <Link href = {n.url}>
                                  see more
                              </Link>
                          </CardContent>
                      </dive>
                  ))}
              </Card>
            </div>
        </div>
       
    );
  }
  

export default Cards;
