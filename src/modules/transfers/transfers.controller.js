import { UserService } from "../users/users.services.js";
import { TransferService } from "./transfers.services.js";

export const makeTransfer = async (req, res) => {
    try {
        const {amount, recipientAccountNumber, senderAccountNumber} = req.body

        const recipientUserPromise = UserService.findOneAccount(recipientAccountNumber)
        const senderUserPromise = UserService.findOneAccount(senderAccountNumber)

        const [recipientUser, senderUser] = await Promise.all([recipientUserPromise, senderUserPromise])
        
        if(!recipientUser){
            return res.status(400).json({
                status: "error",
                message: "recipient account does not exist"
            })
        }

        if(!senderUser){
            return res.status(400).json({
                status: "error",
                message: "sender account does not exist"
            })
        }

        if (amount > senderUser.amount) {
            return res.status(400).json({
                status: "error",
                message: "insufficient balance"
            })
        }

        const newRecipientBalance = amount + recipientUser.amount;
        const newSenderBalance = senderUser.amount - amount;

        await UserService.updateAmount(recipientUser, newRecipientBalance);
        await UserService.updateAmount(senderUser, newSenderBalance);

        await TransferService.createHistoryTransfer(amount, senderUser.id, recipientUser.id)
        
        res.status(200).json({
            message: "transfer ok!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}