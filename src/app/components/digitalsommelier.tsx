import React, { useState } from 'react'
import PromptForm from './PromptForm'
import styles from './digitalsommelier.module.scss'
import WineGlass from './WineGlass'
import { useRouter } from 'next/navigation'

type wineRecommendationProps = {
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

function DigitalSommelier() {

    const router = useRouter();

    const [wineRecommendation, setWineRecommendation] = useState<wineRecommendationProps | null>(null);

    const handleWineRecommendation = (recommendedWine: wineRecommendationProps) => {
        setWineRecommendation(recommendedWine);
    }

    const navigateToSystembolaget = () => {
        const wineColorQuery = `${wineRecommendation?.colorSV}-vin`.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/é/g, 'e');
        const wineTypeQuery = wineRecommendation?.wineTypeSV.replace(/ /g, '+');
        const countryQuery = wineRecommendation?.countrySV.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
        const regionQuery = wineRecommendation?.regionSV.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');

        const query = `https://www.systembolaget.se/sortiment/vin/${wineColorQuery}/?q=${wineTypeQuery}+${countryQuery}+${regionQuery}`

        window.open(query, "_blank", "noopener,noreferrer");
    }

    return (
        <>
            <PromptForm handleWineRecommendation={handleWineRecommendation} />
            {wineRecommendation &&
                <section id="wineRecommendation" className={styles.wineRecommendationContainer}>
                    <div className={styles.wineRecommendation}>
                        <h1>{wineRecommendation.wineType}</h1>
                        <h3>{wineRecommendation.country} - {wineRecommendation.region}</h3>
                        <p>{wineRecommendation.reason}</p>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={navigateToSystembolaget}
                                className='outline'>
                                Find at Systembolaget
                            </button>
                            <button
                                onClick={() => { router.push("#thedigitalsommelier", { scroll: true }) }}
                                className='filled'>
                                Find Another Wine
                            </button>
                        </div>
                    </div>
                    <div className={styles.wineGlass}>
                        <WineGlass color={wineRecommendation.color} />
                    </div>
                </section>
            }
        </>
    )
}

export default DigitalSommelier