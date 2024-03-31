import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchListBlogs = createAsyncThunk(
    'blogs/fetchListBlogs',
    async () => {
        const res = await fetch("http://localhost:8000/blogs");
        const data = await res.json();
        return data;
    }
)

interface IBlogPayload {
    title: string;
    author: string;
    content: string;

}

export const createNewBlog = createAsyncThunk(
    'blogs/createNewBlog',
    async (payload: IBlogPayload, thunkAPI) => {
        const res = await fetch("http://localhost:8000/blogs", {
            method: "POST",
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content
            }),
            headers: {
                "Content-Type": " application/json"
            }
        });
        const data = await res.json();
        if (data && data.id) {
            //create succeed
            thunkAPI.dispatch(fetchListBlogs())
        }
        return data;
    }
)

export const updateABlog = createAsyncThunk(
    'blogs/updateBlog',
    async (payload: any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content
            }),
            headers: {
                "Content-Type": " application/json"
            }
        });
        const data = await res.json();
        if (data && data.id) {
            //create succeed
            thunkAPI.dispatch(fetchListBlogs())
        }
        return data;
    }
)

export const deleteABlog = createAsyncThunk(
    'blogs/deleteABlog',
    async (payload: any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": " application/json"
            }
        });
        const data = await res.json();
        thunkAPI.dispatch(fetchListBlogs())
        return data;
    }
)


interface IBlog {
    id: number;
    title: string;
    author: string;
    content: string;
}


const initialState: {
    listBlogs: IBlog[];
    isCreateSuccess: boolean;
    isUpdateSuccess: boolean;
    isDeleteSuccess: boolean;
} = {
    listBlogs: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false
}

export const blogSlide = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        },
        resetDelete(state) {
            state.isDeleteSuccess = false;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListBlogs.fulfilled, (state, action) => {
            // Add user to the state array
            state.listBlogs = action.payload;
        })
            .addCase(createNewBlog.fulfilled, (state, action) => {
                // Add user to the state array
                state.isCreateSuccess = true;
            })
            .addCase(updateABlog.fulfilled, (state, action) => {
                // Add user to the state array
                state.isUpdateSuccess = true;
            })
            .addCase(deleteABlog.fulfilled, (state, action) => {
                // Add user to the state array
                state.isDeleteSuccess = true;
            })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = blogSlide.actions

export default blogSlide.reducer