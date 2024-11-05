import React, { useState } from "react";
import styles from './promptform.module.scss';
import { Mistral } from "@mistralai/mistralai";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

type WineReturn = {
    wineType: string,
    region: string,
    country: string,
    color: string,
    reason: string,
    wineTypeSV: string,
    regionSV: string,
    countrySV: string,
    colorSV: string,
}

type PromptFormProps = {
    handleWineRecommendation: (recommendedWine: WineReturn) => void;
}

function PromptForm({ handleWineRecommendation }: PromptFormProps) {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const aiClient = new Mistral({
            apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY ?? "",
        });

        try {
            const formData = new FormData(event.currentTarget);
            const result = await aiClient.chat.complete({
                model: "open-mistral-7b",
                messages: [
                    {
                        content: `You are a sommelier that provides the best possible wine pairing for a dish. The dish is described with its ingredients and description. Based on this, you will provide the most suitable wine, including its type, region, country, color, and a detailed explanation of why this wine is a good fit.
                        ### Input:
                        Dish Description: ${formData.get('flavourDescription')}.
                        Ingredients:  ${formData.get('ingredients')}.
                        Preferences: ${formData.get('whiteWine') || ''}, ${formData.get('redWine') || ''}, ${formData.get('roseWine') || ''}, ${formData.get('preference') || ''}, 
                        ### Output (in JSON format):
                        {
                            "wineType": "{{type of wine, e.g., Chardonnay, Cabernet Sauvignon}}",
                            "region": "{{wine-producing region, e.g., Bordeaux, Napa Valley}}",
                            "country": "{{country of origin, e.g., France, Italy}}",
                            "color": "{{color of the wine, e.g., red, white, rosé}}",
                            "reason": "{{detailed explanation of why this wine pairs well with the dish, considering the ingredients, preparation method, and any preferences}}",
                            "wineTypeSV": "{{same as wineType, but in Swedish}}",
                            "regionSV": "{{same as region, but in Swedish}}",
                            "countrySV": "{same as country, but in Swedish}}",
                            "colorSV": "{{same as color, but in Swedish. Should be rött, vitt or rosé}}",
                        }`,
                        role: "user",
                    },
                ],
                responseFormat: { type: "json_object" }, // Specify the response format as JSON
            });

            // Check if choices and content exist
            if (result.choices && result.choices.length > 0) {
                const messageContent = result.choices[0].message.content;

                // Provide a default value if messageContent is undefined or null
                const parsedContent = messageContent ? JSON.parse(messageContent) : null;

                if (parsedContent) {
                    const winePairing: WineReturn = parsedContent;
                    handleWineRecommendation(winePairing);
                    setIsLoading(false);

                    setTimeout(() => {
                        router.push("#wineRecommendation", {scroll: true});
                    }, 10)

                } else {
                    console.error("Parsed content is null or empty.");
                }
            } else {
                console.error("No choices returned from the API.");
            }
        } catch (error) {
            console.error("Error parsing or fetching wine pairing:", error);
        }
    };


    return (
        <section id="thedigitalsommelier" className={styles.prompt}>
            <h2 style={{ marginBottom: '2rem', marginTop: '3rem'}}>The Sommelier</h2>
            <form className={styles.promptWindow} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.inputLabel} htmlFor="ingredients">Ingredients</label>
                    <textarea className={styles.textarea} rows={5} name="ingredients" id="ingredients" placeholder="Enter ingredients..."></textarea>
                </div>
                <div>
                    <label className={styles.inputLabel} htmlFor="flavourDescription">Description</label>
                    <textarea className={styles.textarea} rows={5} name="flavourDescription" id="flavourDescription" placeholder="Enter a description..."></textarea>
                </div>
                <div>
                    <label className={styles.inputLabel}>Preferences</label>
                    <div className={styles.preferences}>
                        <div className={styles.preferencesSelectors}>
                        <input type="checkbox" id="redWine" name="redWine" value="red wine" defaultChecked={false} />
                        <label htmlFor='redWine' className="checkButton">
                            Red Wine
                        </label>
                        <input type="checkbox" id="whiteWine" name="whiteWine" value="white wine" defaultChecked={false} />
                        <label htmlFor='whiteWine' className="checkButton">
                            White Wine
                        </label>
                        <input type="checkbox" id="roseWine" name="roseWine" value="rosé wine" defaultChecked={false} />
                        <label htmlFor='roseWine' className="checkButton">
                            Rosé Wine
                        </label>
                        </div>
                        <textarea className={styles.textarea} rows={1} name="preference" id="preferences" placeholder="Enter other preferences..."></textarea>
                    </div>
                </div>
                <button type="submit" className="filled" style={{marginBottom: "2em"}}>
                    {!isLoading ?
                    "Get Wine Recommendation"
                    :
                    <BeatLoader size={8}/>}
                </button>
            </form>
        </section>
    )
}

export default PromptForm;