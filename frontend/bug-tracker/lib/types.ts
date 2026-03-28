//Pydantic response types
//Use in components

export type Report = {
    id: number
    name: string
    description: string
    importance: number
    status: "not_started" | "in_progress" | "testing" | "completed"
    author_id: number
    date_added: string
}

export type UserInfo = {
    id: number
    username: string
    email: string
}

export type UserResponse = {
    user: UserInfo
    access_token: string
    token_type: string
}