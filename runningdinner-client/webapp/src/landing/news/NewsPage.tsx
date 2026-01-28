import { Box, Grid } from '@mui/material';
import parse from 'html-react-parser';

import { PageTitle } from '../../common/theme/typography/Tags';
import { NewsCard } from './NewsCard';

interface NewsItem {
  title: string;
  content: string;
  date: Date;
}

// Hardcoded news items in English
const newsItems: NewsItem[] = [
  {
    title: 'Bug fixed in route optimization',
    content: 'Unfortunately, there was a bug in the route optimization feature that could cause some teams to meet multiple times. Of course, this should never happen. This bug has now been fixed and should no longer occur when optimizing routes.',
    date: new Date(2025, 11, 7) // December 7, 2025
  },
  {
    title: 'Bug fixed in feedback form',
    content: 'There was unfortunately a bug in the feedback & help form that prevented feedback from being sent. This bug has now been fixed.',
    date: new Date(2025, 9, 21) // October 21, 2025
  },
  {
    title: 'Route Optimization available',
    content: 'Often requested and now finally available in an initial version: It is now possible to optimize the dinner routes so that the distances between the individual teams are as short as possible. <br />Further improvements to this feature are planned for the future. <br />Important: In some cases, the optimization may not result in a noticeable improvement, as this always depends on the specific distribution of participants.',
    date: new Date(2025, 8, 2) // September 2, 2025
  },
  {
    title: 'Meals can be adjusted afterwards',
    content: 'From now on, the meals for a Running Dinner can also be adjusted afterwards. For example, a 3-course event can be changed to a 2-course event if there are too few registrations.',
    date: new Date(2025, 7, 25) // August 25, 2025
  },
  {
    title: 'Limit registrations to zip codes',
    content: 'It is now possible to restrict a Running Dinner event to certain zip codes by configuration, so that the route distances are not too long.',
    date: new Date(2025, 1, 9) // February 9, 2025
  },
  {
    title: 'Enhanced Dinner Route Locations Overview',
    content: 'The complete overview of all routes in the teams area has been enhanced to include some useful additional features.',
    date: new Date(2024, 9, 11) // October 11, 2024
  },
  {
    title: 'Automatic notification before dinner is deleted',
    content: 'From now on, you will receive a notification a few days in advance before your dinner is automatically deleted after it expires.',
    date: new Date(2024, 6, 2) // July 2, 2024
  },
  {
    title: 'Dinner Route improvements',
    content: 'The dinner routes have been improved: There is now a new view that shows all hosts and their routes on a map. This overview of all dinner routes will gradually be enhanced with additional functions.<br/> Bugs in the single dinner route view have also been fixed.',
    date: new Date(2024, 5, 24) // June 24, 2024
  },
  {
    title: 'Improved navigation',
    content: 'All messaging functions can now be found under a separate navigation item, which makes them easier to find and provides a better overview.',
    date: new Date(2024, 5, 16) // June 16, 2024
  },
  {
    title: 'Several bugfixes',
    content: 'In the last few days, errors could occur in connection with the possibility of immediate registration of desired partners, which could have manifested themselves in the fact that, for example, incorrect salutations or incorrect eating habits were used when sending messages. <br />These errors have now been corrected. Sorry, if this has caused you any confusion.',
    date: new Date(2023, 10, 26) // November 26, 2023
  },
  {
    title: 'Swap meals between teams',
    content: 'It is now possible to swap meals between individual teams. Simply click on the "..." next to the selected team and select "Swap meal".',
    date: new Date(2023, 10, 18) // November 18, 2023
  },
  {
    title: 'Swap Order of Participants + Minor Bugfix',
    content: 'From time to time it may happen that you want to move participants from or to the waiting list. Now you can move participants up and down the list as you wish and thus change their order (and thus also the waiting list). Simply click on the "..." next to a selected participant and select "Swap order". <br/>In addition, an error in the waiting list has been fixed when additional teams are generated: Existing teams should now always be retained.',
    date: new Date(2023, 10, 8) // November 8, 2023
  },
  {
    title: 'Technical Updates',
    content: 'Today some basic technological updates were applied. Of course, everything was thoroughly tested, but if an error should come up at any point, please bear with us and contact us directly via feedback!',
    date: new Date(2023, 9, 13) // October 13, 2023
  },
  {
    title: 'Registration as fixed cooking team',
    content: 'Since the beginning it was possible to invite a desired team partner by Email to a dinner event, but this partner still had to register with himself / herself with all data. This has now been simplified, so that it is possible as an alternative to specify just the name of a desired cooking partner during the registration process and both are to be set up as one team.',
    date: new Date(2023, 5, 19) // June 19, 2023
  },
  {
    title: 'Modernized infrastructure',
    content: 'That, too, has to be done: The underlying infrastructure had to be rebuilt and set up in a more modern way, which was a longer process, but is now finished. Everything has been carefully tested to ensure that there are no interruptions. If something suddenly does not work anymore, please report it directly via feedback function.',
    date: new Date(2023, 3, 18) // April 18, 2023
  },
  {
    title: 'Added After-Event-Party',
    content: 'Frequently asked for, now available: When creating an event, the location of an after-event party can be added (and/or it can also be added in the settings). This will then be displayed during participant registration and also in the dinner routes.',
    date: new Date(2023, 3, 17) // April 17, 2023
  },
  {
    title: 'Error fixed when sending invitation mails to team partners',
    content: 'Unfortunately, there was an error that occurred when sending invitation emails to potential team partners and caused the event registration links to not work correctly. This has been fixed in the meantime.',
    date: new Date(2022, 9, 29) // October 29, 2022
  },
  {
    title: 'Finally: New waitinglist functions',
    content: 'Often requested, now finally available: There is a new function in the admin area for waitinglist management with which leftover participants can be added as new teams afterwards or existing teams can be filled up. This should simplify the organization of a Running Dinner event.',
    date: new Date(2022, 6, 12) // July 12, 2022
  },
  {
    title: 'Fixed line breaks',
    content: 'In case you wondered why your event description looked so weird (i.e. no paragraphs were displayed): That (plus a few other minor bugs) is fixed now. If in doubt, you can edit your description again in the settings.',
    date: new Date(2022, 3, 13) // April 13, 2022
  },
  {
    title: 'Mobile number integrated into dinner routes',
    content: 'Often requested, now finally available: You can now also conveniently send the mobile numbers of the hosts via the dinner route mails and/or they are also available in the live dinner route view.',
    date: new Date(2022, 2, 13) // March 13, 2022
  },
  {
    title: 'New User Interface',
    content: "As you may have noticed, the entire user interface has been reimplemented. Besides minor improvements, bugs in the team generation regarding the gender distribution have also been fixed. Everything has been tested extensively, but if you notice any bugs or something doesn't work (as usual), please use the feedback function!",
    date: new Date(2022, 2, 12) // March 12, 2022
  },
  {
    title: 'Excel Export',
    content: 'The participant list was extended by a simple export functionality (Excel).',
    date: new Date(2021, 9, 19) // October 19, 2021
  },
  {
    title: 'Bugfix for problem during generating teams',
    content: 'Unfortunately there was a technical error in the Running Dinner tool, which caused sometimes a problem during team generation. This error is now fixed and furthermore some functions were slighty improved.',
    date: new Date(2020, 9, 1) // October 1, 2020
  },
  {
    title: 'Bugfix for problems during registration',
    content: 'Unfortunately there was a technical error in the Running Dinner tool, which caused some problems during registration to dinner events. This error is now fixed and the registration process works as expected again.',
    date: new Date(2020, 1, 5) // February 5, 2020
  },
  {
    title: 'Bugfix for wrong eating habits',
    content: 'There was an error that caused wrong eating habits being shown of some participants on the dinner routes. This error is now fixed and the eating habits (like e.g. vegetarian) are now properly displayed.',
    date: new Date(2019, 9, 11) // October 11, 2019
  },
  {
    title: 'Multiple languages',
    content: 'The web application supports now also English language. Thus it is now possible to view the running dinner platform also in English language. Furthermore it is now also possible to create Running Rinner events in English language, which is especially useful in Non-German regions.',
    date: new Date(2019, 6, 1) // July 1, 2019
  },
  {
    title: 'News',
    content: 'Now and then, this page will inform you in future about all news and developments of the Running Dinner platform.',
    date: new Date(2019, 5, 20) // June 20, 2019
  }
];

export function NewsPage() {
  return (
    <Box sx={{ mb: 3 }}>
      <PageTitle mt={4}>News</PageTitle>
      <Grid container direction={'column'} spacing={3}>
        {newsItems.map((newsItem, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              lg: 10,
              xl: 8
            }}>
            <NewsCard title={newsItem.title} content={parse(newsItem.content)} date={newsItem.date} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
