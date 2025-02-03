// Suggested code may be subject to a license. Learn more: ~LicenseLog:2085807045.
import Joi from "joi";

const invitationValidation = Joi.object({
  teamId: Joi.string().guid().required(),
  receiverId: Joi.string().guid().required(),
});

const respondInvitationValidation = Joi.object({
  status: Joi.string().valid("PENDING", "ACCEPTED", "DECLINED").required(),
});

export { invitationValidation, respondInvitationValidation };
