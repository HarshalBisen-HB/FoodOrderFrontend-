import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';

const bookData = [
  {
    book_id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    stock_quantity: 100
  },
  {
    book_id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 7.99,
    stock_quantity: 150
  },
  {
    book_id: 3,
    title: "1984",
    author: "George Orwell",
    price: 8.99,
    stock_quantity: 200
  },
  {
    book_id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 6.99,
    stock_quantity: 50
  },
  {
    book_id: 5,
    title: "Letting Go",
    author: "Jane Austen",
    price: 9.99,
    stock_quantity: 75
  },
  {
    book_id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 5.99,
    stock_quantity: 120
  },
  {
    book_id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 12.99,
    stock_quantity: 80
  },
  {
    book_id: 8,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 15.99,
    stock_quantity: 300
  },
  {
    book_id: 9,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    price: 18.99,
    stock_quantity: 60
  },
  {
    book_id: 10,
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    price: 11.99,
    stock_quantity: 90
  }
];

const BookList = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(bookData);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = bookData.filter(book => 
      book.title.toLowerCase().includes(text.toLowerCase()) ||
      book.author.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const renderBookItem = (book) => (
    <TouchableOpacity
      key={book.book_id}
      onPress={() => navigation.navigate('BookDetail', { book })}
    >
      <Surface style={styles.bookCard} elevation={1}>
        <View style={styles.bookInfo}>
          <Text style={styles.titleText}>Title: {book.title}</Text>
          <Text style={styles.authorText}>Author: {book.author}</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>BookList</Text>
        <IconButton
          icon="history"
          size={24}
          onPress={() => navigation.navigate('MyOrders')}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <IconButton
          icon="magnify"
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Title"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#666"
        />
      </View>

      {/* Book List */}
      <ScrollView style={styles.bookList}>
        {filteredBooks.map(renderBookItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'ios' ? 40 : 8,
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 88 : 56,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f0e6ff',
    borderRadius: 8,
    height: 48,
  },
  searchIcon: {
    margin: 0,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  bookList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
  },
  bookInfo: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  authorText: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookList;