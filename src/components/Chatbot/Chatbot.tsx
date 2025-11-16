import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'project_card' | 'link';
  data?: any;
}

interface QuickReply {
  label: string;
  action: () => void;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Agent JOJO, your portfolio assistant. I can help you navigate the site, answer questions about Tharun's projects and skills, or connect you. Tharun is a Computer Science graduate student and developer. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot', type: Message['type'] = 'text', data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      data,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (action: () => void) => {
    action();
  };

  const navigateTo = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      addMessage(`Taking you to ${section}!`, 'bot');
      setTimeout(() => setIsOpen(false), 500);
    } else {
      addMessage(`I couldn't find the ${section} section. Try: projects, about, skills, or contact.`, 'bot');
    }
  };

  const showProjectInfo = () => {
    addMessage('Here are some of the featured projects:', 'bot');
    simulateTyping(() => {
      addMessage(
        '1. Patient Management System - A healthcare microservices system with Spring Boot, gRPC, and Kafka\n\n2. Portfolio Website - This website built with React, TypeScript, and modern UI/UX\n\n3. More projects available on GitHub!',
        'bot'
      );
      addMessage(
        'Would you like to see projects, view the GitHub profile, or learn more about specific technologies?',
        'bot',
        'quick_reply',
        {
          quickReplies: [
            {
              label: 'View Projects Section',
              action: () => navigateTo('projects'),
            },
            {
              label: 'View GitHub',
              action: () => {
                window.open('https://github.com/MotipalliTharun', '_blank');
                addMessage('Opening GitHub profile in a new tab!', 'bot');
              },
            },
            {
              label: 'Learn About Tech Stack',
              action: () => showTechStack(),
            },
          ],
        }
      );
    });
  };

  const showTechStack = () => {
    addMessage('Here\'s Tharun\'s technology expertise:', 'bot');
    simulateTyping(() => {
      addMessage(
        '🛠️ Backend: Java, Spring Boot, Hibernate, Node.js\n\n☁️ Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins\n\n💻 Frontend: React, TypeScript, JavaScript\n\n🗄️ Databases: PostgreSQL, MySQL, MongoDB\n\n📡 Others: REST/gRPC APIs, Kafka, OAuth2/JWT',
        'bot'
      );
      addMessage('Would you like to see the skills section or learn more?', 'bot', 'quick_reply', {
        quickReplies: [
          {
            label: 'View Skills Section',
            action: () => navigateTo('skills'),
          },
          {
            label: 'Back to Main Menu',
            action: () => showMainMenu(),
          },
        ],
      });
    });
  };

  const initiateContact = () => {
    addMessage('Great! Let me help you get in touch with Tharun.', 'bot');
    simulateTyping(() => {
      addMessage(
        'You can reach out via:\n\n📧 Email: Check the contact section\n\n💼 LinkedIn: Available in the contact section\n\n📱 GitHub: github.com/MotipalliTharun\n\n📄 Resume: Available for download in the header',
        'bot'
      );
      addMessage('Would you like me to take you to the contact form?', 'bot', 'quick_reply', {
        quickReplies: [
          {
            label: 'Go to Contact Form',
            action: () => navigateTo('contact'),
          },
          {
            label: 'Back to Main Menu',
            action: () => showMainMenu(),
          },
        ],
      });
    });
  };

  const showMainMenu = () => {
    addMessage('How can I help you?', 'bot', 'quick_reply', {
      quickReplies: [
        {
          label: '📁 View Projects',
          action: () => {
            addMessage('View Projects', 'user');
            navigateTo('projects');
          },
        },
        {
          label: '💼 About Tharun',
          action: () => {
            addMessage('About Tharun', 'user');
            navigateTo('about');
          },
        },
        {
          label: '🛠️ Skills & Tech',
          action: () => {
            addMessage('Skills & Tech', 'user');
            showTechStack();
          },
        },
        {
          label: '📧 Contact',
          action: () => {
            addMessage('Contact', 'user');
            initiateContact();
          },
        },
      ],
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');
    setIsTyping(true);

    // Process user input
    const lowerMessage = userMessage.toLowerCase();

    setTimeout(() => {
      setIsTyping(false);

      if (
        lowerMessage.includes('hello') ||
        lowerMessage.includes('hi') ||
        lowerMessage.includes('hey') ||
        lowerMessage.includes('start')
      ) {
        showMainMenu();
      } else if (
        lowerMessage.includes('project') ||
        lowerMessage.includes('work') ||
        lowerMessage.includes('portfolio') ||
        lowerMessage.includes('github')
      ) {
        addMessage('View Projects', 'user');
        showProjectInfo();
      } else if (
        lowerMessage.includes('skill') ||
        lowerMessage.includes('tech') ||
        lowerMessage.includes('technology') ||
        lowerMessage.includes('stack') ||
        lowerMessage.includes('expertise')
      ) {
        addMessage('Skills & Tech', 'user');
        showTechStack();
      } else if (
        lowerMessage.includes('contact') ||
        lowerMessage.includes('email') ||
        lowerMessage.includes('hire') ||
        lowerMessage.includes('job') ||
        lowerMessage.includes('opportunity') ||
        lowerMessage.includes('connect')
      ) {
        addMessage('Contact', 'user');
        initiateContact();
      } else if (
        lowerMessage.includes('about') ||
        lowerMessage.includes('who') ||
        lowerMessage.includes('background') ||
        lowerMessage.includes('experience')
      ) {
        addMessage('About Tharun', 'user');
        addMessage(
          'Tharun Motipalli is a Java Full Stack Developer with 3+ years of experience specializing in Spring Boot, microservices, and cloud-native applications. Currently pursuing a Master\'s in Computer Science at Florida Institute of Technology.',
          'bot'
        );
        addMessage('Would you like to see more details?', 'bot', 'quick_reply', {
          quickReplies: [
            {
              label: 'View About Section',
              action: () => navigateTo('about'),
            },
            {
              label: 'View Resume',
              action: () => {
                const resumeLink = document.querySelector('a[href*="Resume"]') as HTMLAnchorElement;
                if (resumeLink) {
                  resumeLink.click();
                  addMessage('Opening resume download!', 'bot');
                }
              },
            },
          ],
        });
      } else if (
        lowerMessage.includes('navigate') ||
        lowerMessage.includes('go to') ||
        lowerMessage.includes('show me')
      ) {
        if (lowerMessage.includes('project')) navigateTo('projects');
        else if (lowerMessage.includes('about')) navigateTo('about');
        else if (lowerMessage.includes('skill')) navigateTo('skills');
        else if (lowerMessage.includes('contact')) navigateTo('contact');
        else showMainMenu();
      } else {
        addMessage(
          "I'm not sure I understand that. I can help you with:\n\n• Viewing projects\n• Learning about skills & tech stack\n• Contact information\n• Navigation\n\nTry asking about one of these topics!",
          'bot'
        );
        setTimeout(() => showMainMenu(), 2000);
      }
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Projects', icon: '📁', action: () => navigateTo('projects') },
    { label: 'Skills', icon: '🛠️', action: () => navigateTo('skills') },
    { label: 'Contact', icon: '📧', action: () => navigateTo('contact') },
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
        {!isOpen && messages.length > 1 && <span className="chatbot-badge">{messages.length - 1}</span>}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Chatbot Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="8" y1="22" x2="16" y2="22"></line>
                  </svg>
                </div>
                <div className="chatbot-header-text">
                  <h3>Agent JOJO</h3>
                  <p>Your portfolio assistant</p>
                </div>
              </div>
              <button className="chatbot-minimize" onClick={() => setIsOpen(false)} aria-label="Minimize chatbot">
                ×
              </button>
            </div>

            {/* Messages Area */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  {message.sender === 'bot' && (
                    <div className="message-avatar bot-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="8" y1="22" x2="16" y2="22"></line>
                      </svg>
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      {message.type === 'quick_reply' && message.data?.quickReplies ? (
                        <>
                          <p>{message.text}</p>
                          <div className="quick-replies">
                            {message.data.quickReplies.map((reply: QuickReply, idx: number) => (
                              <button
                                key={idx}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply.action)}
                              >
                                {reply.label}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p>{message.text}</p>
                      )}
                    </div>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <div className="message-avatar bot-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="8" y1="22" x2="16" y2="22"></line>
                    </svg>
                  </div>
                  <div className="message-content">
                    <div className="message-bubble typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="chatbot-quick-actions">
              {quickActions.map((action, idx) => (
                <button key={idx} className="quick-action-btn" onClick={action.action} title={action.label}>
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="chatbot-input-container">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <button
                className="chatbot-send"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

