package gemini

type RequestParams struct {
	Prompt string `json:"prompt"`
}

type Response struct {
	Response   string `json:"response"`
	TokensUsed int32  `json:"tokens_used"`
}
