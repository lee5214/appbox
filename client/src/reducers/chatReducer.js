import { SEND_PUB_CHAT_MSGS} from "../actions/chat";

export const pubChatMessages = (state=[], action) => {
	switch(action.type){
		case SEND_PUB_CHAT_MSGS:
			return [...state,action.payload]
		default:
			return state
	}
}
