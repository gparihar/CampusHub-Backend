import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

// ==============================
// Register for Event
// ==============================
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const existingRegistration = await Registration.findOne({
      student: req.user._id,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for this event",
      });
    }

    const registration = await Registration.create({
      student: req.user._id,
      event: eventId,
    });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get My Registrations
// ==============================
export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      student: req.user._id,
    }).populate("event");

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Cancel Registration
// ==============================
export const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    if (registration.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this registration",
      });
    }

    const event = await Event.findById(registration.event);

    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1;
      await event.save();
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Registration Count
// ==============================
export const getRegistrationCount = async (req, res) => {
  try {
    const count = await Registration.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Registrations For Admin
// ==============================
export const getAllRegistrationsForAdmin = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("student", "name email")
      .populate("event", "title date")
      .sort({ createdAt: -1 });

    const formattedRegistrations = registrations.map((registration) => ({
      _id: registration._id,
      registrationId: registration._id,
      studentId: registration.student?._id,
      studentName: registration.student?.name,
      studentEmail: registration.student?.email,
      eventId: registration.event?._id,
      eventTitle: registration.event?.title,
      eventDate: registration.event?.date,
    }));

    res.status(200).json({
      success: true,
      count: formattedRegistrations.length,
      registrations: formattedRegistrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Registration By Admin
// ==============================
export const deleteRegistrationByAdmin = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    const event = await Event.findById(registration.event);

    if (event && event.registeredCount > 0) {
      event.registeredCount -= 1;
      await event.save();
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid registration id",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
