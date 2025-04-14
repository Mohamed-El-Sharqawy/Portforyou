"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquarePlus, Send, Copy, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "./chatbot.css";
import { getToken } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [userId, setUserId] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const userIdQuery = searchParams.get("userId");

  const isOwner = userId === userIdQuery;
  
  useEffect(() => {
    const { decodedToken } = getToken();
    setUserId(decodedToken?.userId);
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hi! I'm your portfolio content assistant. Ask me to help you write compelling headlines, bios, service descriptions, or any other content for your portfolio."
        }
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && currentResponseIndex < messages[messages.length - 1]?.content.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + messages[messages.length - 1].content[currentResponseIndex]);
        setCurrentResponseIndex(prev => prev + 1);
      }, 15); // Speed of typing
      
      return () => clearTimeout(timer);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [isTyping, currentResponseIndex, messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Call OpenAI API
      const response = await fetch("/api/portfolio-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const data = await response.json();
      
      // Add assistant response
      const assistantMessage = { role: "assistant" as const, content: data.content };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Start typing animation
      setDisplayedText("");
      setCurrentResponseIndex(0);
      setIsTyping(true);
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if(!isOwner) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-wheat text-black p-3 rounded-full shadow-lg hover:bg-wheat/90 transition-all z-50"
        aria-label="Open content assistant"
      >
        <MessageSquarePlus size={24} />
      </button>

      {/* Dialog overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Dialog content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-wheat/20 rounded-lg w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-wheat/20 flex justify-between items-center">
                <h2 className="text-wheat text-lg font-medium">Portfolio Content Assistant</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-wheat/60 hover:text-wheat transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-wheat/10 text-wheat" : "bg-wheat/5 text-wheat/90"}`}
                    >
                      {index === messages.length - 1 && message.role === "assistant" && isTyping ? (
                        <div className="relative">
                          <p className="whitespace-pre-wrap">{displayedText}</p>
                          <span className="inline-block w-2 h-4 bg-wheat/60 ml-1 animate-blink"></span>
                        </div>
                      ) : (
                        <div className="relative group">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          {message.role === "assistant" && (
                            <button
                              onClick={() => copyToClipboard(message.content)}
                              className="absolute -right-10 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-wheat/60 hover:text-wheat"
                              aria-label="Copy to clipboard"
                            >
                              <Copy size={16} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-wheat/20">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask for help with your portfolio content..."
                    className="w-full bg-[#1a1a1a] text-wheat rounded-lg pl-4 pr-12 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-wheat/30"
                    rows={2}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className={`absolute right-3 bottom-3 text-wheat/60 ${!isLoading && input.trim() ? "hover:text-wheat" : ""} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
                {isLoading && (
                  <p className="text-wheat/40 text-xs mt-2 animate-pulse">Generating response...</p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
