export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
}

export const books = [
  {
    id: 1,
    title: 'Phone XL',
    author: 'Apple',
    price: 799,
    description: 'A large phone with one of the best screens'
  },
  {
    id: 2,
    title: 'Phone Mini',
    author: 'Apple',
    price: 699,
    description: 'A great phone with one of the best cameras'
  },
  {
    id: 3,
    title: 'Phone Standard',
    author: 'Apple',
    price: 299,
    description: ''
  }
];


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/