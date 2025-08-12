import { Router } from 'express';
import { userService } from '../services/userService';
import { trimBody } from '../middlewares/trimBody';
import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { extractErrors } from '../utils/errParse';

export const userController = Router();

userController.get('/count', async (_, res) => {
  try {
    const userDataCount = await userService.getAllCount();
    res.status(200).json(userDataCount);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.post('/login', trimBody, async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    res.status(200).json(userData);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(401).json({ errors });
  }
});

userController.post('/register', trimBody, async (req, res) => {
  try {
    const userData = await userService.register({ ...req.body });
    res.status(201).json(userData);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.get('/:id/saved-offers', isAuthenticated, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }

    const userData = await userService.getSavedCarOffers(req.params.id);
    res.status(200).json(userData?.savedCarOffers);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.post('/:id/saved-offers', isAuthenticated, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }

    const { carOfferId } = req.body;
    const userData = await userService.addCarOfferToSaved(req.params.id, carOfferId);
    res.status(201).json(userData?.savedCarOffers);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.put('/:id/saved-offers', isAuthenticated, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }

    const { carOfferId } = req.body;
    const userData = await userService.removeCarOfferFromSaved(req.params.id, carOfferId);
    res.status(200).json(userData?.savedCarOffers);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.get('/:id', isAuthenticated, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const userData = await userService.getUserInfo(req.params.id);
    res.status(200).json(userData);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.put('/:id', isAuthenticated, trimBody, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const userData = await userService.updateUserInfo(req.params.id, { ...req.body });
    res.status(201).json(userData);
  } catch (error: any) {
    if (
      error.message ===
      'The value of "offset" is out of range. It must be >= 0 && <= 17825792. Received 17825794'
    ) {
      return res.status(400).json({ errors: ['File size too large! File must be below 15MB!'] });
    }
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.get('/', isAuthenticated, isAdmin, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    if (Object.keys(req.query).length > 0) {
      const { page, limit, searchTerm, sort } = req.query;
      const data = await userService.getPaginatedUsers(limit, page, searchTerm, sort);
      res.status(200).json(data);
    } else {
      const userData = await userService.getAllUsers();
      res.status(200).json(userData);
    }
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.delete('/:id', isAuthenticated, isAdmin, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const userData = await userService.deleteUser(req.params.id);
    res.status(200).json(userData);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

/* userController.get('/:id/favourites', isAuthenticated, async (req, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const userData = await userService.getFavouriteProducts(req.params.id);
    res.status(201).json(userData.favouriteProducts);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.post('/:id/favourites', isAuthenticated, async (req, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const userData = await userService.addProductToFavourites(req.params.id, req.body);
    res.status(201).json(userData.favouriteProducts);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

userController.put('/:id/favourites', isAuthenticated, async (req, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const userData = await userService.removeProductFromFavourites(req.params.id, req.body);
    res.status(201).json(userData.favouriteProducts);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});
 */
