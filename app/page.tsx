"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const topics = [
    { emoji: "🙇‍♂️", value: "Work" },
    { emoji: "🏃", value: "People" },
    { emoji: "🐕", value: "Animals" },
    { emoji: "🍲", value: "Food" },
    { emoji: "📺", value: "Television" },
  ];
  const genres = [
    { emoji: "🍄", value: "Pun" },
    { emoji: "🍅", value: "Knock-knock" },
    { emoji: "🥕", value: "Story" },
    { emoji: "🌰", value: "Free-style" },
  ];
  const tones = [
    { emoji: "😉", value: "Witty" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😊", value: "Silly" },
    { emoji: "😎", value: "Dark" },
    { emoji: "😂", value: "goofy" },
  ];

  const [state, setState] = useState({
    topic: "",
    genre: "",
    tone: "",
  });

  const [firstMessage, setFirstMessage] = useState("");
  const [secondMessage, setSecondMessage] = useState("");
  const [lastAction, setLastAction] = useState("");

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFirstButtonClick = async () => {
    setLastAction("generate");
    await append({
      role: "user",
      content: `Generate a ${state.genre} joke about ${state.topic} in a ${state.tone} tone`,
    });
  };

  const handleSecondButtonClick = async () => {
    setLastAction("rate");
    await append({
      role: "user",
      content: `Rate the previous joke: "${firstMessage}"`,
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]?.content;
      if (lastAction === "generate") {
        setFirstMessage(lastMessage);
      } else if (lastAction === "rate") {
        setSecondMessage(lastMessage);
      }
    }
  }, [messages, lastAction]);

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the joke by selecting the topic, genre and tone.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Topic</h3>

            <div className="flex flex-wrap justify-center">
              {topics.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="topic"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.topic || !state.genre || !state.tone}
            onClick={handleFirstButtonClick}
          >
            Generate Joke
          </button>

          <div
            hidden={firstMessage === ""}
            className="bg-opacity-50 bg-gray-700 rounded-lg p-4"
          >
            {firstMessage}
          </div>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-4"
            disabled={isLoading || firstMessage === ""}
            onClick={handleSecondButtonClick}
          >
            Evaluate the Joke
          </button>

          <div
            hidden={secondMessage === ""}
            className="bg-opacity-50 bg-gray-700 rounded-lg p-4 mt-4"
          >
            {secondMessage}
          </div>
        </div>
      </div>
    </main>
  );
}