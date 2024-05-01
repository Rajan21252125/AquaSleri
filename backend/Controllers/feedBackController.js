import Feedback from "../Schema/feedbackSchema.js";




export const addFeedback = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }
        await Feedback.create({ name, email, subject, message });
        return res.status(201).json({ status: true, msg: 'Feedback submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};



// to view feedback and sort by date
export const viewFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        return res.status(200).json({ status: true, feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};



export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ status: false, msg: 'Feedback not found' });
        }
        await Feedback.findByIdAndDelete(id);
        return res.status(200).json({ status: true, msg: 'Feedback deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
}
