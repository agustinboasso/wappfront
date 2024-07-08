import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGES_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
    status:"",
    error:"",
    conversations:[],
    activeConversation:{},
    messages:[],
    notifications: [],
};


//Funciones

export const getConversations = createAsyncThunk("conversation/all", async(token, { rejectWithValue }) => {
    console.log("token",`Bearer ${token}`);
    try {
        const { data } = await axios.get('https://wappback.onrender.com/api/v1/conversation',{
            headers:{
                
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("data get conversation: " ,data);
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const open_create_conversation = createAsyncThunk("conversation/open_create", async(values, { rejectWithValue }) => {

    const { token, receiver_id } = values;
    
    try {
        const { data } = await axios.post('https://wappback.onrender.com/api/v1/conversation',{
            receiver_id
        },{
            headers:{
                
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("data open create: " ,data);
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const getConversationMessages = createAsyncThunk("conversation/messages", async(values, { rejectWithValue }) => {

    const { token, convo_id } = values;
    
    try {
        const { data } = await axios.get(`https://wappback.onrender.com/api/v1/message/${convo_id}`,{
            headers:{
                
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("data get conversation messages: " ,data);
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
});

export const sendMessage = createAsyncThunk("message/send", async(values, { rejectWithValue }) => {

    const { token, message, convo_id, files } = values;
    
    try {
        const { data } = await axios.post(`https://wappback.onrender.com/api/v1/message`, {
            message, 
            convo_id, 
            files
        },{
            headers:{
                
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("data send message: " ,data);
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
});


export const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setActiveConversation:(state,action)=>{
            state.activeConversation = action.payload;
        },
        // update messages
        updateMessagesAndConversations:(state,action) => {
            let convo = state.activeConversation;
            if(convo._id === action.payload.conversation._id){
                state.messages = [...state.messages, action.payload];
                
            };
        //update conversations
            let conversation = {
                ...action.payload.conversation, 
                latestMessage:action.payload,
            };
            let newConvos = [...state.conversations].filter((c) => c._id !== conversation._id);
            newConvos.unshift(conversation);
            state.conversations = newConvos;

        },
    },
    extraReducers(builder){
        builder
            .addCase(getConversations.pending,(state,action)=>{
                state.status = "loading";
            })
            .addCase(getConversations.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.conversations = action.payload;
            })
            .addCase(getConversations.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(open_create_conversation.pending,(state,action)=>{
                state.status = "loading";
            })
            .addCase(open_create_conversation.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.activeConversation = action.payload;
            })
            .addCase(open_create_conversation.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getConversationMessages.pending,(state,action)=>{
                state.status = "loading";
            })
            .addCase(getConversationMessages.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.messages = action.payload;
            })
            .addCase(getConversationMessages.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(sendMessage.pending,(state,action)=>{
                state.status = "loading";
            })
            .addCase(sendMessage.fulfilled,(state,action)=>{
                console.log("New message sent, updating state", action.payload);
                state.status = "succeeded";
                state.messages = [...state.messages, action.payload];
                let conversation = {
                    ...action.payload.conversation, 
                    latestMessage:action.payload
                }
                let newConvos = [...state.conversations].filter((c) => c._id !== conversation._id);
                newConvos.unshift(conversation);
                state.conversations = newConvos;
            })
            .addCase(sendMessage.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload;
            })
    }
});


export const { setActiveConversation, updateMessagesAndConversations } = chatSlice.actions;

export default chatSlice.reducer;

