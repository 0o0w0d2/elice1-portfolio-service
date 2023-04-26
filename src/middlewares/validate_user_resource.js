import { AwardModel } from '../db/schemas/award';

function validate_user_resource(Model) {
  return async (req, res, next) => {
    const { id } = req.params;
    const resource = await Model.findOne({ id });
    const user_id = req.currentUserId;

    if (!resource || resource.user.toString() !== user_id) {
      return res.status(401).send('Unauthorized');
    }

    req.resource = resource;
    next();
  };
}

// 아래 하나씩 정의하고, export!
const validate_user_award = validate_user_resource(AwardModel);
console.log(validate_user_award);

export { validate_user_resource, validate_user_award };
