import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload'
import Gallery from './Gallery'
import axios from 'axios';
import SearchImages from './SearchImages.js';
import MyPhotos from './MyPhotos';

export default function Feed() {
  const [images, setImages] = useState([]);
  const token= localStorage.getItem('jwt');
  console.log(token);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages= async()=>{
      try{
      const response= await axios.get('https://image-gallery-app-production.up.railway.app/posts/images',{headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }})
      setImages(response.data);
      }
      catch(error){
     console.log('Error fetching images:', error);
      }
  }



  const updateGallery= (searchResults)=>{
    setImages(searchResults);
  }

  return (
    <div className='m-5 border border-2 border-dark-subtle rounded p-5'>
      <ImageUpload fetchImages={fetchImages}/>
      <SearchImages updateGallery={updateGallery}/>
      {/* <MyPhotos myimages={myimages}/> */}
      <Gallery images={images}/>
    </div>
  )
}
