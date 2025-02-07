// models/Message.js
import { DataTypes } from "sequelize";
import sequelize from "../../database/db.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('SENT', 'DELIVERED', 'READ', 'FAILED'),
      allowNull: false,
      defaultValue: 'SENT',
    }
  },
  {
    timestamps: true,
  }
);

export default Message;
