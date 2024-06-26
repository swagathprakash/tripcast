package gemini

import (
	"context"
	"errors"
	"log"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type Model struct {
	gemini *genai.GenerativeModel
}

func NewGeminiService(ctx context.Context, apiKey, genModel string) *Model {

	// Access your API key as an environment variable (see "Set up your API key" above)
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatal(err)
	}

	geminiModel := client.GenerativeModel(genModel)

	return &Model{
		gemini: geminiModel,
	}
}

func (m Model) GenerateResponse(ctx context.Context, text string) (genai.Text, int32, error) {

	chat := m.gemini.StartChat()
	chat.History = []*genai.Content{
		{
			Parts: []genai.Part{
				genai.Text(UserPart),
			},
			Role: "user",
		},
	}

	resp, err := chat.SendMessage(ctx, genai.Text(text))
	if err != nil {
		return "", 0, err
	}

	response := resp.Candidates[0].Content.Parts[0]
	responseString, ok := response.(genai.Text)

	if !ok {
		return "", 0, errors.New("recieved response is not of text format")
	}

	tokensUsed := resp.UsageMetadata.TotalTokenCount

	return responseString, tokensUsed, nil
}
