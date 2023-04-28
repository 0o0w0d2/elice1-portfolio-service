import asyncHandler from '../utils/asyncHandler';
import {
  createNewAwardForCurrentUser,
  deleteAwardForCurrentUser,
  getAllAwardsForCurrentUser,
  updateAwardforCurrentUser,
} from '../db/models/Award';

// award api Controllers

export const getAllAwards = asyncHandler(async (req, res) => {
  // console.log(req.currentUserId);
  const awards = await getAllAwardsForCurrentUser(req.currentUserId);
  if (awards.length < 1) throw new Error('There is no awards.'); // error 변경하기

  res.send(awards);
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

// export const updateAward = asyncHandler(async (req, res) => {
//   // const { id } = req.params;
//   const { title, description, year } = req.body;
//   const award = req.resource;
//   await updateAwardforCurrentUser(award, {
//     title,
//     description,
//     year,
//   });
//   res.status(201).send('Updated');
// });
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

// export const deleteAward = asyncHandler(async (req, res) => {
//   // const { id } = req.params;
//   const award = req.resource;
//   await deleteAwardForCurrentUser(award);

//   if (!award) res.status(404).send('Not Found');

//   res.status(201).send('Deleted');
// });
export const deleteAward = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  await deleteAwardForCurrentUser(id, req.currentUserId);

  res.status(204).send();
});
