import React, { createContext, useState, useContext } from 'react';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
    const [conversationid, setConversationid] = useState(null);

    return (
        <ConversationContext.Provider value={{ conversationid, setConversationid }}>
            {children}
        </ConversationContext.Provider>
    );
};

export const useConversation = () => useContext(ConversationContext);
