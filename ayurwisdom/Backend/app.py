import os
import streamlit as st
from dotenv import load_dotenv
from utils import get_answer, text_to_speech, autoplay_audio, speech_to_text
from audio_recorder_streamlit import audio_recorder
from streamlit_float import float_init

# Load environment variables
load_dotenv()

# Initialize floating features
float_init()

# Apply Custom CSS for Styling
st.markdown("""
    <style>
        /* Set light green background */
        body {
            background: linear-gradient(to right, #e6f7e6, #d4edda);
            font-family: 'Arial', sans-serif;
        }

        /* Center title with padding */
        .title {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #2c6e49;
            padding: 10px;
            background-color: #f0fff0;
            border-radius: 10px;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
        }

        /* Chat messages */
        .stChatMessage {
            border-radius: 15px;
            padding: 12px;
            margin: 8px 0;
        }
        
        /* User messages */
        .stChatMessage.user {
            background-color: #d4edda;
            text-align: right;
            color: #155724;
        }
        
        /* Assistant messages */
        .stChatMessage.assistant {
            background-color: #f8d7da;
            color: #721c24;
        }

        /* Footer styling */
        .footer {
            text-align: center;
            font-size: 14px;
            color: #555;
            padding: 10px;
        }

    </style>
""", unsafe_allow_html=True)

# Initialize session state for chat messages
def initialize_session_state():
    if "messages" not in st.session_state:
        st.session_state.messages = [{"role": "assistant", "content": "Hi! How may I assist you today?"}]

initialize_session_state()

st.markdown('<div class="title">🌿🤖 AyurWisdom Voice Chatbot</div>', unsafe_allow_html=True)

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

# Create a container for voice input
footer_container = st.container()
with footer_container:
    audio_bytes = audio_recorder()

# Process voice input
if audio_bytes:
    with st.spinner("Transcribing..."):
        webm_file_path = "temp_audio.mp3"
        with open(webm_file_path, "wb") as f:
            f.write(audio_bytes)
        
        transcript = speech_to_text(webm_file_path)
        
        if transcript:
            st.session_state.messages.append({"role": "user", "content": transcript})
            with st.chat_message("user"):
                st.write(transcript)
            os.remove(webm_file_path)

# Generate chatbot response
if st.session_state.messages[-1]["role"] != "assistant":
    with st.chat_message("assistant"):
        with st.spinner("Thinking...🤔"):
            final_response = get_answer(st.session_state.messages)

        with st.spinner("Generating audio response..."):    
            audio_file = text_to_speech(final_response)
            autoplay_audio(audio_file)

        st.write(final_response)
        st.session_state.messages.append({"role": "assistant", "content": final_response})
        os.remove(audio_file)

# Footer
st.markdown('<div class="footer">© 2025 AyurWisdom. All rights reserved.</div>', unsafe_allow_html=True)
