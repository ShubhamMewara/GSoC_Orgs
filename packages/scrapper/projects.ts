import puppeteer from "puppeteer";

export async function scrapeProjects(year:number){
    const browser = await puppeteer.launch({headless: false});
    try{
        const page = await browser.newPage();
        await page.goto(`https://summerofcode.withgoogle.com/archive/${year}/projects`, { timeout: 2 * 60 * 1000 });
        await page.waitForSelector('.project-card-wrapper');
        const rangeoforgs = await page.evaluate(() =>{
            return document.querySelector('.mat-paginator-range-label')?.textContent
        })
        const numofpages = Math.floor(Number(rangeoforgs?.split(' ')[5])/50);
        let allOrgs:any = [];
        for (let i = 0; i <= numofpages; i++) {
            await page.waitForSelector('.content');
            let orgsOnPage = await page.evaluate((year)=>{
                let orgcard = Array.from( document.querySelectorAll('.content'))
                let data = orgcard.map((card:any) => {
                    return {
                        contributor: card.querySelector('.contributor__content')?.innerText.trim(),
                        mentor: card.querySelector('.mentor .mentor__content')?.innerText.trim(),
                        organization: card.querySelector('.organization .mentor__content')?.innerText.trim(),
                        title: card.querySelector('.title')?.innerText.trim(),
                        description: card.querySelector('.description')?.innerText.trim(),
                        projectDetails: card.querySelector('.projects-button a')?.href.trim(),
                        codeLink: card.querySelector('.h-list__item:nth-of-type(2) a')?.href.trim(),
                        year: year, 
                    };
                });
                return data;
            },year);
            allOrgs.push(orgsOnPage);
            await page.waitForTimeout(1000);
            
            const next = await page.waitForSelector('body > app-root > app-layout > mat-sidenav-container > mat-sidenav-content.mat-drawer-content.mat-sidenav-content.site__main.theme.theme--gray.ng-star-inserted > div > div > main > app-projects > app-projects-list > section > div > app-hybrid-projects-list > div:nth-child(2) > mat-paginator > div > div > div.mat-paginator-range-actions > button.mat-focus-indicator.mat-tooltip-trigger.mat-paginator-navigation-next.mat-icon-button.mat-button-base > span.mat-button-wrapper > svg');
            if(next){
            await next.click();
            }else{
                console.log('No next button found');
            }
            if(i == numofpages ){
                return allOrgs ;
            }
        }

    }catch(e){
        return {data:"Error Occurred! " + e};
    } finally {
        await browser.close();
   }
}