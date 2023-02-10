import { redirect, useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');

  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;

export const checkAuth = () => {
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (!token) {
    return redirect('/auth?mode=login');
  }
  return null;
};
