import os
import openai
from dotenv import load_dotenv
import streamlit as st

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def speech_to_text(audio_file):
    """Convert speech to text using OpenAI's Whisper model."""
    with open(audio_file, "rb") as file:
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            response_format="text",
            file=file
        )
    return transcript

def text_to_speech(input_text):
    """Convert text to speech using OpenAI's TTS model."""
    response = client.audio.speech.create(
        model="tts-1",
        voice="nova",
        input=input_text
    )
    
    audio_path = "temp_audio_play.mp3"
    with open(audio_path, "wb") as f:
        response.stream_to_file(audio_path)
    
    return audio_path

def autoplay_audio(audio_file):
    """Embed an audio file in the Streamlit app for playback."""
    with open(audio_file, "rb") as audio:
        audio_data = audio.read()
    
    st.audio(audio_data, format="audio/mp3")

def get_answer(messages):
    """Generate a chatbot response only for Ayurveda-related queries."""
    
    # Define a list of Ayurveda-related keywords
    ayurveda_keywords = [
        "Ayurveda", "dosha", "vata", "pitta", "kapha", "prakriti", "detox",
        "herbs", "turmeric", "ashwagandha", "triphala", "panchakarma",
        "ayurvedic diet", "ayurvedic medicine", "herbal", "home remedies",
        "yoga", "meditation", "holistic healing", "natural therapy"
    ]
    
    # Extract the latest user query
    user_message = messages[-1]["content"].lower()

    # Check if the query is related to Ayurveda
    if not any(keyword in user_message for keyword in ayurveda_keywords):
        return "I'm here to assist with Ayurveda-related questions only. Please ask me something related to Ayurveda. 😊"

    # Modify the system prompt to ensure the bot stays within Ayurveda topics
    system_message = [
        {"role": "system", "content": "You are an expert Ayurvedic chatbot. You will answer only Ayurveda-related questions based on Ayurvedic principles and traditional wisdom."}
    ]
    
    # Append user messages and get a response
    messages = system_message + messages
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages
    )
    
    return response.choices[0].message.content
