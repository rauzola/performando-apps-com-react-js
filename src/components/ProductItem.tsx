/* eslint-disable react/display-name */
import { memo, useState } from 'react';
import { AddProductToWishlistProps } from './AddProductToWishlist';
import dynamic from 'next/dynamic';
import lodash from 'lodash';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishlist] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>
     
      { isAddingToWishList && (
        <AddProductToWishlist 
        onAddToWishlist={() => onAddToWishlist(product.id)}
        onRequestClose={() => setIsAddingToWishlist(false)}
      />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (pervProps, nextProps) => {
  return lodash.isEqual(pervProps.product, nextProps.product)
});