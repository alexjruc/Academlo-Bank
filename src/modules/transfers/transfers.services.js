import Transfer from './transfers.model.js';

export class TransferService {
    static async createHistoryTransfer(amount, senderUserId, receiverUserId) {
        return await Transfer.create({
            amount,
            senderUserId,
            receiverUserId,
        });
    }
}
