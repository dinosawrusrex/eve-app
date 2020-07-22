import React from 'react';
import { Flipped } from "react-flip-toolkit";
import { CategoryCardProps } from '../../models/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Category.scss';

const CategoryCard = ({ index, category, categoryClicked, shouldFlip } : CategoryCardProps) : JSX.Element => {
  return (
    <Flipped
      flipId={`category-${index}`}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("expanded")
        }, 300)
      }}
    >
      <div className="category">
        <Flipped inverseFlipId={`category-${index}`} shouldInvert={shouldFlip(index)}>
          <div className="category__content-container">
            <Flipped flipId={`heading-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
              <h3 className="category--expanded__name">{category.name}</h3>
            </Flipped>
            <div className="category__button-container">
              <button onClick={():any => categoryClicked(index)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <Flipped flipId={`delete-${index}`} stagger="card-content" shouldFlip={shouldFlip(index)}>
                <button>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </Flipped>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default CategoryCard;
