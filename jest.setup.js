import { render, screen } from '@testing-library/react';
import ReviewList from '../components/ReviewList';
import axios from 'axios';

jest.mock('axios');

test('renders reviews', async () => {
    const reviews = [
        { _id: '1', title: 'Great Album', content: 'Loved it!', rating: 5 },
        { _id: '2', title: 'Not Bad', content: 'It was okay.', rating: 3 }
    ];

    axios.get.mockResolvedValue({ data: reviews });

    render(<ReviewList />);

    const reviewTitles = await screen.findAllByText(/Great Album|Not Bad/i);
    expect(reviewTitles).toHaveLength(2);
});
