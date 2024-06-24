import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct';
import HorizontalCard from '../components/HorizontalCard';
import VerticalCard from '../components/VerticalCard';

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCard category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCard category={"watches"} heading={"Popular's Watches"}/>

      <VerticalCard category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCard category={"Mouse"} heading={"Mouse"}/>
      <VerticalCard category={"televisions"} heading={"Televisions"}/>
      <VerticalCard category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCard category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCard category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCard category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCard category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home