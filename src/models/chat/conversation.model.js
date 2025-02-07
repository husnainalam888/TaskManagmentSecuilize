import sequelize from "../../database/db.js"
import { DataTypes } from "sequelize"

const Conversation = sequelize.define("Conversation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastMessageId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

},{ timestamps: true })

export default Conversation
