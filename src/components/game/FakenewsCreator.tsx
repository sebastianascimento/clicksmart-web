'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface FakenewsCreatorProps {
  onComplete: (score: number) => void;
}

const FakenewsCreator: React.FC<FakenewsCreatorProps> = ({ onComplete }) => {
  const t = useTranslations('fakenewsCreator');
  const [gameStage, setGameStage] = useState<'create' | 'preview' | 'reaction' | 'lesson'>('create');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Fake news content state
  const [headline, setHeadline] = useState('');
  const [date, setDate] = useState('today');
  const [content, setContent] = useState('');
  
  // UI state for custom dropdowns
  const [openDropdown, setOpenDropdown] = useState<null | 'headline' | 'date' | 'content'>(null);

  // Define headline options
  const headlineOptions = [
    { id: 'option1', text: t('createSection.headlineOptions.option1') },
    { id: 'option2', text: t('createSection.headlineOptions.option2') },
    { id: 'option3', text: t('createSection.headlineOptions.option3') },
    { id: 'option4', text: t('createSection.headlineOptions.option4') }
  ];
  
  // Define content options
  const contentOptions = [
    { id: 'option1', text: t('createSection.contentOptions.option1') },
    { id: 'option2', text: t('createSection.contentOptions.option2') },
    { id: 'option3', text: t('createSection.contentOptions.option3') },
    { id: 'option4', text: t('createSection.contentOptions.option4') }
  ];
  
  // Define date options
  const dateOptions = [
    { id: 'today', text: t('createSection.dateOptions.today') },
    { id: 'yesterday', text: t('createSection.dateOptions.yesterday') },
    { id: 'lastWeek', text: t('createSection.dateOptions.lastWeek') },
    { id: 'madeUp', text: t('createSection.dateOptions.madeUp') }
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getSelectedHeadlineText = () => {
    const option = headlineOptions.find(opt => opt.id === headline);
    return option ? option.text : '';
  };
  
  const getSelectedContentText = () => {
    const option = contentOptions.find(opt => opt.id === content);
    return option ? option.text : '';
  };
  
  const getSelectedDateText = () => {
    const option = dateOptions.find(opt => opt.id === date);
    return option ? option.text : '';
  };

  const handlePublish = () => {
    if (headline && content && date) {
      setGameStage('preview');
      // Add some points for creating the news
      setScore(prevScore => prevScore + 5);
    } else {
      alert('Por favor preencha todos os campos para criar a notícia.');
    }
  };

  const handleShowReactions = () => {
    setGameStage('reaction');
    // Add more points for proceeding to see reactions
    setScore(prevScore => prevScore + 10);
  };

  const handleShowLesson = () => {
    setGameStage('lesson');
    // Add more points for learning the lesson
    setScore(prevScore => prevScore + 15);
  };

  const handleFinishGame = () => {
    onComplete(score);
  };

  const handleCreateNew = () => {
    setHeadline('');
    setDate('today');
    setContent('');
    setGameStage('create');
  };
  
  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: 'headline' | 'date' | 'content') => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 text-center animate-fadeIn">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-800 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[3px] after:bg-green-600 after:rounded-md">
          {t('loading', { defaultValue: t('gameTitle') })}
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  // Create stage - where users create the fake news
  if (gameStage === 'create') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 animate-fadeIn">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-green-600 after:rounded-md">
          {t('createSection.title')}
        </h2>
        
        {/* Headline Selection - Custom Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">{t('createSection.headlineLabel')}</label>
          
          {/* Custom Dropdown Button */}
          <button
            type="button"
            className="w-full p-2.5 bg-white border border-gray-300 text-left rounded-lg flex justify-between items-center focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={() => toggleDropdown('headline')}
          >
            <span className="text-gray-800 truncate">
              {headline ? getSelectedHeadlineText().substring(0, 30) + "..." : "Selecione um título"}
            </span>
            <svg className={`w-4 h-4 transition-transform ${openDropdown === 'headline' ? 'transform rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Content */}
          {openDropdown === 'headline' && (
            <div className="mt-1 border border-gray-300 rounded-lg bg-white shadow-lg z-10 overflow-hidden">
              {headlineOptions.map(option => (
                <button
                  key={option.id}
                  className={`w-full p-3 text-left hover:bg-gray-100 border-b border-gray-200 ${
                    headline === option.id ? 'bg-green-50 text-green-700' : 'text-gray-800'
                  }`}
                  onClick={() => {
                    setHeadline(option.id);
                    setOpenDropdown(null);
                  }}
                >
                  {option.text.substring(0, 60)}...
                </button>
              ))}
            </div>
          )}
          
          {/* Preview of selected headline */}
          {headline && (
            <div className="mt-2 p-2 bg-green-50 text-green-800 text-sm rounded-md">
              <strong>Título:</strong> {getSelectedHeadlineText()}
            </div>
          )}
        </div>
        
        {/* Date Selection - Custom Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">{t('createSection.dateLabel')}</label>
          
          {/* Custom Dropdown Button */}
          <button
            type="button"
            className="w-full p-2.5 bg-white border border-gray-300 text-left rounded-lg flex justify-between items-center focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={() => toggleDropdown('date')}
          >
            <span className="text-gray-800">
              {getSelectedDateText()}
            </span>
            <svg className={`w-4 h-4 transition-transform ${openDropdown === 'date' ? 'transform rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Content */}
          {openDropdown === 'date' && (
            <div className="mt-1 border border-gray-300 rounded-lg bg-white shadow-lg z-10 overflow-hidden">
              {dateOptions.map(option => (
                <button
                  key={option.id}
                  className={`w-full p-3 text-left hover:bg-gray-100 border-b border-gray-200 ${
                    date === option.id ? 'bg-green-50 text-green-700' : 'text-gray-800'
                  }`}
                  onClick={() => {
                    setDate(option.id);
                    setOpenDropdown(null);
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Content Selection - Custom Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">{t('createSection.contentLabel')}</label>
          
          {/* Custom Dropdown Button */}
          <button
            type="button"
            className="w-full p-2.5 bg-white border border-gray-300 text-left rounded-lg flex justify-between items-center focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={() => toggleDropdown('content')}
          >
            <span className="text-gray-800 truncate">
              {content ? getSelectedContentText().substring(0, 30) + "..." : "Selecione o conteúdo"}
            </span>
            <svg className={`w-4 h-4 transition-transform ${openDropdown === 'content' ? 'transform rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Content */}
          {openDropdown === 'content' && (
            <div className="mt-1 border border-gray-300 rounded-lg bg-white shadow-lg z-10 overflow-hidden">
              {contentOptions.map(option => (
                <button
                  key={option.id}
                  className={`w-full p-3 text-left hover:bg-gray-100 border-b border-gray-200 ${
                    content === option.id ? 'bg-green-50 text-green-700' : 'text-gray-800'
                  }`}
                  onClick={() => {
                    setContent(option.id);
                    setOpenDropdown(null);
                  }}
                >
                  {option.text.substring(0, 60)}...
                </button>
              ))}
            </div>
          )}
          
          {/* Preview of selected content */}
          {content && (
            <div className="mt-2 p-2 bg-green-50 text-green-800 text-sm rounded-md max-h-24 overflow-y-auto">
              <strong>Conteúdo:</strong> {getSelectedContentText().substring(0, 120)}...
            </div>
          )}
        </div>
        
        <button 
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-all font-semibold hover:shadow-lg active:translate-y-0.5"
          onClick={handlePublish}
        >
          {t('createSection.publish')}
        </button>
      </div>
    );
  }

  // Preview stage - where users see their created fake news
  if (gameStage === 'preview') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 animate-fadeIn">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-green-600 after:rounded-md">
          {t('previewSection.title')}
        </h2>
        
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6 shadow-sm">
          {/* Fake news preview */}
          <div className="bg-gray-100 p-2 border-b border-gray-300 flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('previewSection.source')}</span>
            <span className="text-sm text-gray-600">
              {getSelectedDateText()}
            </span>
          </div>
          
          <div className="p-4">
            <h3 className="text-xl font-bold mb-3 text-gray-900">{getSelectedHeadlineText()}</h3>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{getSelectedContentText()}</p>
            
            <div className="border-t border-gray-200 pt-3 flex justify-between text-sm text-gray-500">
              <span>👍 423 Gostos</span>
              <span>💬 98 {t('previewSection.comments')}</span>
              <span>↗️ 215 {t('previewSection.shares')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-all hover:shadow-sm"
            onClick={handleCreateNew}
          >
            {t('previewSection.edit')}
          </button>
          <button 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-all font-semibold hover:shadow-lg active:translate-y-0.5"
            onClick={handleShowReactions}
          >
            {t('previewSection.publish')}
          </button>
        </div>
      </div>
    );
  }

  // Reaction stage with improved text visibility
  if (gameStage === 'reaction') {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 animate-fadeIn">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-green-600 after:rounded-md">
          {t('reactionSection.title')}
        </h2>
        
        <div className="p-3 sm:p-5 mb-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-black truncate">{getSelectedHeadlineText().substring(0, 25)}...</span>
            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded font-medium">Viral</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
              <div className="text-lg font-bold text-black">1,240</div>
              <div className="text-sm text-black font-medium">{t('reactionSection.shareCount')}</div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
              <div className="text-lg font-bold text-black">312</div>
              <div className="text-sm text-black font-medium">{t('previewSection.comments')}</div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-md font-bold mb-2 text-black">Reações populares:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300 text-black font-medium">😱 {t('reactionSection.reactionTypes.fear')} 86</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300 text-black font-medium">😡 {t('reactionSection.reactionTypes.anger')} 64</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300 text-black font-medium">😲 {t('reactionSection.reactionTypes.confusion')} 58</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300 text-black font-medium">🤔 {t('reactionSection.reactionTypes.excitement')} 31</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-bold mb-2 text-black">{t('previewSection.comments')}:</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="text-xs font-semibold text-black">Maria123</div>
                <div className="text-black">{t('reactionSection.exampleComments.comment1')}</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="text-xs font-semibold text-black">Pedro87</div>
                <div className="text-black">{t('reactionSection.exampleComments.comment2')}</div>
              </div>
              <div className="bg-white p-2 rounded border border-gray-200">
                <div className="text-xs font-semibold text-black">Ana_Racional</div>
                <div className="text-black">{t('reactionSection.exampleComments.comment3')}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 sm:p-5 mb-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-xl font-bold mb-3 text-orange-800">{t('reactionSection.impact.title')}</h3>
          <p className="mb-4 text-black leading-relaxed">{t('reactionSection.impact.description')}</p>
          <ul className="list-disc pl-5 space-y-2 mb-4 text-black">
            <li>{t('reactionSection.impact.effect1')}</li>
            <li>{t('reactionSection.impact.effect2')}</li>
            <li>{t('reactionSection.impact.effect3')}</li>
            <li>{t('reactionSection.impact.effect4')}</li>
          </ul>
          <div className="text-xl font-bold text-center text-orange-800 mt-4">
            {t('reactionSection.impact.message')}
          </div>
        </div>
        
        <button 
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-all font-semibold hover:shadow-lg active:translate-y-0.5"
          onClick={handleShowLesson}
        >
          {t('continue')}
        </button>
      </div>
    );
  }

  // Lesson stage with improved text visibility
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 animate-fadeIn">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-green-600 after:rounded-md">
        {t('lessonSection.title')}
      </h2>
      
      <div className="p-3 sm:p-5 mb-6 bg-green-50 rounded-lg border border-green-100">
        <p className="text-lg mb-4 text-black leading-relaxed">
          {t('lessonSection.message')}
        </p>
        
        <h3 className="text-lg font-bold mb-2 text-black">{t('lessonSection.factTitle')}</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-black">
          <li>{t('lessonSection.fact1')}</li>
          <li>{t('lessonSection.fact2')}</li>
          <li>{t('lessonSection.fact3')}</li>
        </ul>
        
        <h3 className="text-lg font-bold mb-2 text-black">{t('lessonSection.whatToDo')}</h3>
        <ul className="list-disc pl-5 space-y-2 text-black">
          <li>{t('lessonSection.tip1')}</li>
          <li>{t('lessonSection.tip2')}</li>
          <li>{t('lessonSection.tip3')}</li>
          <li>{t('lessonSection.tip4')}</li>
        </ul>
      </div>
      
      <div className="flex flex-col space-y-3">
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-all hover:shadow-sm"
          onClick={handleCreateNew}
        >
          {t('createNew')}
        </button>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-all font-semibold hover:shadow-lg active:translate-y-0.5"
          onClick={handleFinishGame}
        >
          {t('finishGame')}
        </button>
      </div>
      
      <div className="mt-4 text-center text-green-700 font-bold">
        {t('score')}: {score}
      </div>
    </div>
  );
};

export default FakenewsCreator;