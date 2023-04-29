import asyncHandler from '../utils/asyncHandler';
import {
  createNewAwardForCurrentUser,
  deleteAwardForCurrentUser,
  getAllAwardsForCurrentUser,
  updateAwardforCurrentUser,
} from '../db/models/Award';

// award api Controllers
export const getAllAwards = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log('currentcinser:', req.currentUserId);
  console.log('userIdinser:', userId);

  if (!userId) {
    // If no user ID is provided, return all awards for the current user
    const awards = await getAllAwardsForCurrentUser(
      req.currentUserId,
      req.currentUserId
    );
    if (awards.length < 1) throw new Error('There is no awards.');
    res.send(awards);
  } else {
    // Return only the awards for the specified user
    const awards = await getAllAwardsForCurrentUser(req.currentUserId, userId);
    if (awards.length < 1) throw new Error('There is no awards.');
    res.send(awards);
  }
});

export const createNewAward = asyncHandler(async (req, res) => {
  const { title, description, year } = req.body;

  await createNewAwardForCurrentUser({
    title,
    description,
    year,
    user: req.currentUserId,
  });
  res.status(201).send('Created');
});

export const updateAward = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, year } = req.body;

  await updateAwardforCurrentUser(id, req.currentUserId, {
    title,
    description,
    year,
  });

  res.status(201).send('Updated');
});

export const deleteAward = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteAwardForCurrentUser(id, req.currentUserId);

  res.status(204).send();
});
