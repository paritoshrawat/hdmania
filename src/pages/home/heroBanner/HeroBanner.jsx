import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/UseFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadingImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const heroBanner = () => {
  const [background,setBackground] = useState("");
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
  const {url} = useSelector((state)=>state.home);
const {data,loading } = useFetch("/movie/upcoming");

  useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg)

  },[data])

  const searchQueryHandler = (event)=>{
    if(event.key === "Enter" && query.length>0){
      navigate(`/search/${query}`)

    }

  }

  return (
    <div className='heroBanner'>

   { !loading &&   <div className="backdrop_img">
        <Img src={background}/>
      </div>
      }

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">welcome</span>
          <span className="subTitle">
            Millions of movies,Tv Shows and webseries
             to discover. 
            Explore Now.
          </span>
          {/* <form action='/' methode='get' className='Search-Bar'> */}
          <div className="searchInput">
            <input 
            type="text"
            placeholder='Search For Movies or Tv Shows...'
            onChange={(e)=>setQuery(e.target.value)}
            onKeyUp={searchQueryHandler} />
            <button type='submit'>Search
            
            </button>
          </div>
          {/* </form> */}
        </div>
      
            </ContentWrapper>
    </div>
  )
}

export default heroBanner
