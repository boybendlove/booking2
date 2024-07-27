const Room = require('../Models/Room');
const express = require('express');

// Lấy thông tin của một phòng dựa trên ID
exports.getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }
    res.json(room);
  } catch (err) {
    console.error('Lỗi khi lấy thông tin phòng:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.getAllRoom = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.createRoom = async (req, res) => {
  const {title, desc, maxPeople, price, roomNumbers} = req.body
  try {
    const newRoom = new Room({ title, desc, maxPeople, price, roomNumbers });
    await newRoom.save()
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Lỗi khi tạo phong:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// Cập nhật thông tin của một khách sạn
exports.updateRoom = async (req, res) => {
  const {title, desc, maxPeople, price, roomNumbers} = req.body
  const roomID = req.params.roomID
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomID, {title, desc, maxPeople, price, roomNumbers}, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ error: 'Không tìm thấy phong' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin phong:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// Xóa một khách sạn
exports.deleteRoom = async (req, res) => {
  const roomID = req.params.roomID
  try {
    const deletedRoom = await Room.findByIdAndDelete(roomID);
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Không tìm thấy phong' });
    }
    res.status(200).json({ message: 'phong đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa khách sạn:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};