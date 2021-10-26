import React from "react";
import Tmdb from "./Tmdb";
import { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
  const loadAll = async () => {
   let list = await Tmdb.getHomeList();
   setMovieList(list);

   let originals = list.filter(i=>i.slug === 'originals');
   let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length - 1));
   let chosen = originals[0].items.results[randomChosen];
   let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
   setFeaturedData(chosenInfo);
  }

   loadAll();
  }, []);

  useEffect(()=>{
    const scrollListenner = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
      
    }
    window.addEventListener('scroll', scrollListenner);

    return () => {
      window.removeEventListener('scroll', scrollListenner);
    }

  },[]);

  

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
      <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
          </div>
        ))}
      </section>

     <footer>
     Feito por Felipe Giacomelli<br/>
     Base de dados do site Themoviedb.org
     </footer>
    {movieList.length <= 0 &&
    <div className="loading">
      <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>
    </div>
    }

    </div>   
  );
}
