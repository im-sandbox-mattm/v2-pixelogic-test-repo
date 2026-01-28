import { Box, Grid } from '@mui/material';
import { parse } from 'date-fns';

import { PageTitle } from '../../common/theme/typography/Tags';
import { NewsCard } from './NewsCard';

// News items with hardcoded English content
const NEWS_ITEMS = [
  {
    date: '2025-12-07',
    title: 'Bug fixed in route optimization',
    content:
      'Unfortunately, there was a bug in the route optimization feature that could cause some teams to meet multiple times. ' +
      'Of course, this should never happen. This bug has now been fixed and should no longer occur when optimizing routes.',
  },
  {
    date: '2025-10-21',
    title: 'Bug fixed in feedback form',
    content: 'There was unfortunately a bug in the feedback & help form that prevented feedback from being sent. This bug has now been fixed.',
  },
  {
    date: '2025-09-02',
    title: 'Route Optimization available',
    content:
      'Often requested and now finally available in an initial version: It is now possible to optimize the dinner routes so that the distances between the individual teams are as short as possible. ' +
      'Further improvements to this feature are planned for the future. ' +
      'Important: In some cases, the optimization may not result in a noticeable improvement, as this always depends on the specific distribution of participants.',
  },
  {
    date: '2025-08-25',
    title: 'Meals can be adjusted afterwards',
    content:
      'From now on, the meals for a Running Dinner can also be adjusted afterwards. For example, a 3-course event can be changed to a 2-course event if there are too few registrations.',
  },
  {
    date: '2025-02-09',
    title: 'Limit registrations to zip codes',
    content: 'It is now possible to restrict a Running Dinner event to certain zip codes by configuration, so that the route distances are not too long.',
  },
  {
    date: '2024-10-11',
    title: 'Enhanced Dinner Route Locations Overview',
    content: 'The complete overview of all routes in the teams area has been enhanced to include some useful additional features.',
  },
  {
    date: '2024-07-02',
    title: 'Automatic notification before dinner is deleted',
    content: 'From now on, you will receive a notification a few days in advance before your dinner is automatically deleted after it expires.',
  },
  {
    date: '2024-06-24',
    title: 'Dinner Route improvements',
    content:
      'The dinner routes have been improved: There is now a new view that shows all hosts and their routes on a map. ' +
      'This overview of all dinner routes will gradually be enhanced with additional functions. ' +
      'Bugs in the single dinner route view have also been fixed.',
  },
  {
    date: '2024-06-16',
    title: 'Improved navigation',
    content: 'All messaging functions can now be found under a separate navigation item, which makes them easier to find and provides a better overview.',
  },
  {
    date: '2023-11-26',
    title: 'Several bugfixes',
    content:
      'In the last few days, errors could occur in connection with the possibility of immediate registration of desired partners, ' +
      'which could have manifested themselves in the fact that, for example, incorrect salutations or incorrect eating habits were used when sending messages. ' +
      'These errors have now been corrected. Sorry, if this has caused you any confusion.',
  },
  {
    date: '2023-11-18',
    title: 'Swap meals between teams',
    content: 'It is now possible to swap meals between individual teams. Simply click on the "..." next to the selected team and select "Swap meal".',
  },
  {
    date: '2023-11-08',
    title: 'Swap Order of Participants + Minor Bugfix',
    content:
      'From time to time it may happen that you want to move participants from or to the waiting list. ' +
      'Now you can move participants up and down the list as you wish and thus change their order (and thus also the waiting list). ' +
      'Simply click on the "..." next to a selected participant and select "Swap order". ' +
      'In addition, an error in the waiting list has been fixed when additional teams are generated: Existing teams should now always be retained.',
  },
  {
    date: '2023-10-13',
    title: 'Technical Updates',
    content:
      'Today some basic technological updates were applied. Of course, everything was thoroughly tested, ' +
      'but if an error should come up at any point, please bear with us and contact us directly via feedback!',
  },
  {
    date: '2023-06-19',
    title: 'Registration as fixed cooking team',
    content:
      'Since the beginning it was possible to invite a desired team partner by Email to a dinner event, but this partner still had to register with himself / herself with all data. ' +
      'This has now been simplified, so that it is possible as an alternative to specify just the name of a desired cooking partner during the registration process and both are to be set up as one team.',
  },
  {
    date: '2023-04-18',
    title: 'Modernized infrastructure',
    content:
      'That, too, has to be done: The underlying infrastructure had to be rebuilt and set up in a more modern way, which was a longer process, but is now finished. ' +
      'Everything has been carefully tested to ensure that there are no interruptions. If something suddenly does not work anymore, please report it directly via feedback function.',
  },
  {
    date: '2023-04-17',
    title: 'Added After-Event-Party',
    content:
      'Frequently asked for, now available: When creating an event, the location of an after-event party can be added (and/or it can also be added in the settings). ' +
      'This will then be displayed during participant registration and also in the dinner routes.',
  },
  {
    date: '2022-10-29',
    title: 'Error fixed when sending invitation mails to team partners',
    content:
      'Unfortunately, there was an error that occurred when sending invitation emails to potential team partners and caused the event registration links to not work correctly. This has been fixed in the meantime.',
  },
  {
    date: '2022-07-12',
    title: 'Finally: New waitinglist functions',
    content:
      'Often requested, now finally available: There is a new function in the admin area for waitinglist management with which leftover participants can be added as new teams afterwards or existing teams can be filled up. ' +
      'This should simplify the organization of a Running Dinner event.',
  },
  {
    date: '2022-04-13',
    title: 'Fixed line breaks',
    content:
      'In case you wondered why your event description looked so weird (i.e. no paragraphs were displayed): That (plus a few other minor bugs) is fixed now. If in doubt, you can edit your description again in the settings.',
  },
  {
    date: '2022-03-13',
    title: 'Mobile number integrated into dinner routes',
    content:
      'Often requested, now finally available: You can now also conveniently send the mobile numbers of the hosts via the dinner route mails and/or they are also available in the live dinner route view.',
  },
  {
    date: '2022-03-12',
    title: 'New User Interface',
    content:
      'As you may have noticed, the entire user interface has been reimplemented. ' +
      'Besides minor improvements, bugs in the team generation regarding the gender distribution have also been fixed. ' +
      "Everything has been tested extensively, but if you notice any bugs or something doesn't work (as usual), please use the feedback function!",
  },
  {
    date: '2021-10-19',
    title: 'Excel Export',
    content: 'The participant list was extended by a simple export functionality (Excel).',
  },
  {
    date: '2020-10-01',
    title: 'Bugfix for problem during generating teams',
    content:
      'Unfortunately there was a technical error in the Running Dinner tool, which caused sometimes a problem during team generation. ' +
      'This error is now fixed and furthermore some functions were slighty improved.',
  },
  {
    date: '2020-02-05',
    title: 'Bugfix for problems during registration',
    content:
      'Unfortunately there was a technical error in the Running Dinner tool, which caused some problems during registration to dinner events. ' +
      'This error is now fixed and the registration process works as expected again.',
  },
  {
    date: '2019-10-11',
    title: 'Bugfix for wrong eating habits',
    content:
      'There was an error that caused wrong eating habits being shown of some participants on the dinner routes. ' +
      'This error is now fixed and the eating habits (like e.g. vegetarian) are now properly displayed.',
  },
  {
    date: '2019-07-01',
    title: 'Multiple languages',
    content:
      'The web application supports now also English language. ' +
      'Thus it is now possible to view the running dinner platform also in English language. Furthermore it is now also possible to ' +
      'create Running Rinner events in English language, which is especially useful in Non-German regions.',
  },
  {
    date: '2019-06-20',
    title: 'News',
    content: 'Now and then, this page will inform you in future about all news and developments of the Running Dinner platform.',
  },
];

export function NewsPage() {
  // Parse dates and sort by most recent first
  const newsItems = NEWS_ITEMS.map((item) => ({
    ...item,
    parsedDate: parse(item.date, 'yyyy-MM-dd', new Date()),
  })).sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());

  return (
    <Box sx={{ mb: 3 }}>
      <PageTitle mt={4}>News</PageTitle>
      <Grid container direction={'column'} spacing={3}>
        {newsItems.map((newsItem) => (
          <Grid
            key={newsItem.date}
            size={{
              xs: 12,
              lg: 10,
              xl: 8
            }}>
            <NewsCard title={newsItem.title} content={newsItem.content} date={newsItem.parsedDate} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
