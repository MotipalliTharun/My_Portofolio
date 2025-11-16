import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoryMode.css';

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  sectionId: string;
  icon: string;
}

const chapters: Chapter[] = [
  {
    id: 'prologue',
    title: 'Prologue',
    subtitle: 'The Beginning',
    sectionId: 'intro',
    icon: '🎬'
  },
  {
    id: 'chapter1',
    title: 'Chapter I',
    subtitle: 'About Me',
    sectionId: 'about',
    icon: '📖'
  },
  {
    id: 'chapter2',
    title: 'Chapter II',
    subtitle: 'Skills',
    sectionId: 'skills',
    icon: '⚔️'
  },
  {
    id: 'chapter3',
    title: 'Chapter III',
    subtitle: 'Projects',
    sectionId: 'projects',
    icon: '🏗️'
  },
  {
    id: 'chapter4',
    title: 'Chapter IV',
    subtitle: 'Blog',
    sectionId: 'blog',
    icon: '📚'
  },
  {
    id: 'chapter5',
    title: 'Chapter V',
    subtitle: 'Contact',
    sectionId: 'contact',
    icon: '📧'
  },
  {
    id: 'epilogue',
    title: 'Epilogue',
    subtitle: 'Footer',
    sectionId: 'footer',
    icon: '🌟'
  }
];

interface StoryModeProps {
  currentSection: string;
  onChapterSelect: (sectionId: string) => void;
}

const StoryMode: React.FC<StoryModeProps> = ({ currentSection, onChapterSelect }) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const chapterIndex = chapters.findIndex(ch => ch.sectionId === currentSection);
    if (chapterIndex !== -1) {
      setActiveChapter(chapterIndex);
    }
  }, [currentSection]);

  const currentChapter = chapters[activeChapter];

  return (
    <>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="story-mode-container"
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="story-mode-header">
              <h3 className="story-mode-title">
                <span className="story-icon">{currentChapter.icon}</span>
                Story Mode
              </h3>
              <button
                className="story-mode-close"
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize story mode"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="story-mode-content">
              <motion.div
                key={currentChapter.id}
                className="story-chapter-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="story-chapter-header">
                  <div className="story-chapter-number">{currentChapter.title}</div>
                  <h4 className="story-chapter-subtitle">{currentChapter.subtitle}</h4>
                </div>
              </motion.div>

              <div className="story-chapters-list">
                {chapters.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    className={`story-chapter-item ${index === activeChapter ? 'active' : ''}`}
                    onClick={() => {
                      setActiveChapter(index);
                      onChapterSelect(chapter.sectionId);
                    }}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="chapter-item-icon">{chapter.icon}</span>
                    <div className="chapter-item-content">
                      <div className="chapter-item-title">{chapter.title}</div>
                      <div className="chapter-item-subtitle">{chapter.subtitle}</div>
                    </div>
                    {index < activeChapter && (
                      <span className="chapter-complete-check">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="story-progress-container">
                <div className="story-progress-label">Progress</div>
                <div className="story-progress-bar">
                  <motion.div
                    className="story-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="story-progress-text">
                  {activeChapter + 1} / {chapters.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && (
        <motion.button
          className="story-mode-toggle"
          onClick={() => setIsMinimized(false)}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, x: 3 }}
        >
          <span className="toggle-icon">📖</span>
          <span className="toggle-text">Story</span>
        </motion.button>
      )}
    </>
  );
};

export default StoryMode;
