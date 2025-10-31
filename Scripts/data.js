// Shop item information: {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, category: {string}, added: {date}}
export const items = [
    {id: 1, title: 'Pink and yellow wooden armchairs', price: 200, description: 'Two wooden armchairs with pink seats and yellow cushions', images: ['Images/two-chairs.jpg', 'Images/ImgPlaceholder1.png', 'Images/ImgPlaceholder2.png'], category: 'Armchairs', added: new Date(2025, 9, 25)},
    {id: 2, title: 'Wooden end table', price: 100, description: 'Small wooden table with a glass top', images: ['Images/wooden-table.jpg', 'Images/ImgPlaceholder1.png', 'Images/ImgPlaceholder2.png'], category: 'End Tables', added: new Date(2025, 10, 4)},
    {id: 3, title: 'Blue L-shaped couch', price: 350, description: 'Blue L-shaped couch', images: ['Images/blue-couch.jpg', 'Images/ImgPlaceholder1.png', 'Images/ImgPlaceholder2.png'], category: 'Couches', added: new Date(2025, 10, 4)},
    {id: 4, title: 'Wooden drawers', price: 250, description: 'A set of wooden drawers with golden handles', images: ['Images/wooden-drawers.jpeg', 'Images/ImgPlaceholder1.png', 'Images/ImgPlaceholder2.png'], category: 'Drawers', added: new Date(2025, 10, 10)},
    {id: 5, title: 'Wooden dining table with black chairs', price: 450, description: 'A wooden dining table with black chairs', images: ['Images/wooden-dining-table.jpg', 'Images/ImgPlaceholder1.png', 'Images/ImgPlaceholder2.png'], category: 'Dining Tables', added: new Date(2025, 10, 22)}   
]
/*
Image sources: 
Pink and yellow wooden armchairs: https://unsplash.com/photos/two-chairs-next-to-each-other-Rt42FVatg90 Tanya Paquet
Wooden end table: https://unsplash.com/photos/a-small-wooden-table-with-a-glass-top-oz65UblZ2LQ Sean Foster
Blue L-shaped couch: https://unsplash.com/photos/a-blue-couch-sitting-on-top-of-a-wooden-table-Eax4KNMMA9k Marcel Costa
Wooden drawers: https://www.vecteezy.com/photo/55970663-a-wooden-chest-with-two-drawers-on-the-side?autodl_token=d8e6f65cd77502f04f12b1386ed39a214e24e4168013f52e0b1fd75488bcfd347fd1885a50a8ade0206cca2e3265d4e70a81e105acdb84f9c03cf8eb50199fa0 Oleg Gapeenko
Wooden dining table with black chairs: https://unsplash.com/photos/a-dining-room-table-with-chairs-zGKRmwzplVc ONNO
*/

// Allowed types of furniture by room: {roomName: [(list of names of categories of items)]}
export const categories = {
    livingRoom: ['Couches', 'End Tables', 'Armchairs'],
    bedroom: ['End Tables', 'Drawers'],
    diningRoom: ['Dining Tables'],
    all: []
}