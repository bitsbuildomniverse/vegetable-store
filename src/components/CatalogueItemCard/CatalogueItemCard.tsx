import React, {useContext, useEffect, useState} from 'react';
import classes from "./CatalogueItemCard.module.css";
import PagesContext from '../../pages/PagesContext';
import { isEqual, compact } from 'lodash'

export default (props: any) => {

  const {
    item
  } = props

  const [selectedVolume, setSelectedVolume] = useState(item.volumes[0])
  const [currentCount, setCurrentCount] = useState(0)

  const catalogueContext = useContext(PagesContext);

  const cartItems = catalogueContext?.cartItems;

  useEffect(() => {
    const newCount = compact(
      cartItems?.map((cartItem) => {
        if (isEqual(cartItem.item.selectedVolume, selectedVolume) && cartItem.item.item.name === item.name) {
          return cartItem.count;
        }
      })
    )[0]
    newCount ? setCurrentCount(newCount) : setCurrentCount(0);
  })

  const volumes = item.volumes.map((volume: any, index: number) => {
    return (
      <li key={index}
          onClick={() => {setSelectedVolume(volume)}}
          className={isEqual(selectedVolume, volume) ? classes.volume_active : classes.volume}
      >
        {volume.volume}
      </li>
    )
  })

  return (
    <li className={classes.CatalogueItemCard}

    >
      <div className={classes.cover}
           style={{backgroundImage: `url(${item.cover})`}}
      >
        <img src={require('../../images/icons/open.svg')}
             alt=""
             className={classes.open}
             onClick={() => catalogueContext?.selectActiveItem(item)}
        />
      </div>
      <div className={classes.options}>
        <div className={classes.holder}>
          <div className={classes.column}>
            <span className={classes.type}>{item.type}</span>
            <h2 className={classes.title}>{item.name}</h2>
          </div>
          <div className={classes.count}>
            <button className={classes.counter}
                    onClick={() => catalogueContext?.removeItemFromCart({item, selectedVolume}, 1)}
            >
              <img src={require('../../images/icons/minus.svg')} alt=""/>
            </button>
            {currentCount || 0}
            <button className={classes.counter}
                    onClick={() => catalogueContext?.addItemToCart({item, selectedVolume})}
            >
              <img src={require('../../images/icons/plus.svg')} alt=""/>
            </button>
          </div>
        </div>
        <ul className={classes.list}>
          { volumes }
        </ul>
        <div className={classes.column}>
          <h2 className={classes.title}>{selectedVolume.price1} руб</h2>
          <span className={classes.type}>-10% за 1 шт при покупке 3 шт</span>
        </div>
      </div>
    </li>
  );
};