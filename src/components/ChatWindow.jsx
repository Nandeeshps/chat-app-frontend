import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Paper, Typography, IconButton, InputBase, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button, Badge } from '@mui/material';
import { Search, Send, AttachFile, Brightness4, Brightness7, ExitToApp, MoreVert, Chat, Group } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScrollableBox = styled(Box)({
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 200px)',
});

const ChatWindow = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    console.log('Stored username:', storedUsername); // Debugging statement
    console.log('Stored userId:', storedUserId); // Debugging statement
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact._id);
    }
  }, [selectedContact]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts', error);
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      if (!userId) {
        throw new Error('User ID is not available in local storage');
      }
      console.log('Fetching messages for userId:', userId, 'and contactId:', contactId); // Debugging statement
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}/${contactId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      if (!userId) {
        throw new Error('User ID is not available in local storage');
      }
      console.log('Sending message from userId:', userId, 'to contactId:', selectedContact._id); // Debugging statement
      const response = await axios.post('http://localhost:5000/api/messages', {
        sender: userId,
        receiver: selectedContact._id,
        text: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#7289da',
      },
      secondary: {
        main: '#43b581',
      },
      background: {
        default: darkMode ? '#121212' : '#ffffff', // Set background color
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#8e9297' : '#4f4f4f',
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: theme.palette.background.default }}>
        {/* Sidebar Icons */}
        <Paper sx={{ width: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, backgroundColor: theme.palette.primary.main }}>
          <IconButton>
            <Chat sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <IconButton>
            <Group sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <IconButton onClick={toggleTheme}>
            {darkMode ? <Brightness7 sx={{ color: theme.palette.text.primary }} /> : <Brightness4 sx={{ color: theme.palette.text.primary }} />}
          </IconButton>
          <IconButton onClick={handleLogout}>
            <ExitToApp sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Paper>

        {/* User Info and Search */}
        <Paper sx={{ width: 300, display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, backgroundColor: theme.palette.primary.main }}>{username[0]}</Avatar>
            <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>{username}</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', border: `1px solid ${theme.palette.secondary.main}`, borderRadius: 1 }}>
            <InputBase
              sx={{ ml: 1, flex: 1, color: theme.palette.secondary.main }}
              placeholder="Search Users"
              inputProps={{ 'aria-label': 'search users' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <Search sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
          </Box>
          <Divider />
          {/* User List */}
          <ScrollableBox>
            <List>
              {filteredContacts.map((contact) => (
                <ListItem button key={contact._id} onClick={() => handleContactClick(contact)}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>{contact.username[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.username}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {contact.lastMessage}
                        </Typography>
                        {' — '}
                        {contact.time}
                      </>
                    }
                    sx={{ color: theme.palette.text.secondary }}
                  />
                  {contact.unread > 0 && (
                    <Badge badgeContent={contact.unread} color="secondary" />
                  )}
                </ListItem>
              ))}
            </List>
          </ScrollableBox>
        </Paper>

        {/* Chat Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
              {selectedContact ? `Chat with ${selectedContact.username}` : 'Select a contact to start chatting'}
            </Typography>
            <IconButton>
              <MoreVert sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
          </Box>
          <Divider />
          {/* Messages */}
          <ScrollableBox sx={{ flexGrow: 1, p: 2 }}>
            {selectedContact && messages.length > 0 ? (
              messages.map((message) => (
                <Box
                  key={message._id}
                  sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: message.sender === localStorage.getItem('userId') ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Avatar sx={{ mr: 1, backgroundColor: theme.palette.primary.main }}>{message.sender === localStorage.getItem('userId') ? username[0] : selectedContact.username[0]}</Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: message.sender === localStorage.getItem('userId') ? theme.palette.primary.main : theme.palette.grey[300],
                      color: message.sender === localStorage.getItem('userId') ? theme.palette.primary.contrastText : 'inherit',
                      borderRadius: 1,
                      p: 1,
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                No messages to display.
              </Typography>
            )}
          </ScrollableBox>
          <Divider />
          {/* Message Input */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Type a message"
              fullWidth
              sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!selectedContact}
            />
            <IconButton>
              <AttachFile sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
            <Button variant="contained" color="primary" endIcon={<Send />} onClick={sendMessage} disabled={!selectedContact}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatWindow;
