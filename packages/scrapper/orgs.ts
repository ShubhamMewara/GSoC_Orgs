import puppeteer from "puppeteer";

export async function scrapeOrgs(year:number){
    const browser = await puppeteer.launch({headless:false});
    try{
        const page = await browser.newPage();
        await page.goto(`https://summerofcode.withgoogle.com/programs/2024/organizations`, { timeout: 2 * 60 * 1000 });
        await page.waitForSelector('.mat-paginator-range-label');
        const rangeoforgs = await page.evaluate(() =>{
            return document.querySelector('.mat-paginator-range-label')?.textContent
        })
        const numofpages = Math.floor(Number(rangeoforgs?.split(' ')[5])/50);
        let allOrgs:any = [];
        for (let i = 0; i <= numofpages; i++) {
            await page.waitForSelector('.card');
            let orgsOnPage = await page.evaluate((year)=>{
                let orgcard = Array.from( document.querySelectorAll('.card'))
                let data = orgcard.map((card:any) => {
                    return {
                        name: card.querySelector('.name').innerText,
                        description: card.querySelector('.short-description').innerText,
                        img: card.querySelector('img').src,
                        link: card.querySelector('a').href,
                        year: year, 
                    };
                });
                return data;
            },year);
            allOrgs.push(orgsOnPage)
            const next = await page.waitForSelector('body > app-root > app-layout > mat-sidenav-container > mat-sidenav-content > div > div > main > app-program-organizations > app-orgs-grid > section.list-wrapper.section.theme--gray > div > mat-paginator > div > div > div.mat-paginator-range-actions > button.mat-focus-indicator.mat-tooltip-trigger.mat-paginator-navigation-next.mat-icon-button.mat-button-base > span.mat-button-wrapper > svg');
            if (next) {
                await next.click();
            }else{
                console.log('No next button found');
            }
            if(i == numofpages){
                return allOrgs.flat();
            }
        }

    }catch(e){
        return {data:"Error Occurred! " + e};
    } finally {
        await browser.close();
   }
}