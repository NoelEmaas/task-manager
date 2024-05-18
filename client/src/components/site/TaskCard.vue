<script setup>
import axios from "axios"
import { computed } from 'vue'
import { ref } from 'vue'

// UI Components
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import AddTask from "@/components/site/AddTask.vue"

// Lucide Icons
import { Trash2, Pencil } from 'lucide-vue-next';

const props = defineProps({
    id: Number,
    title: String,
    due: Date,
    status: Boolean
})

// Toggle the status of the task (completed or not)
const emit = defineEmits(['updateTaskList'])

const status = ref(props.status);
const toggleStatus = async () => {
    status.value = !status.value;
    
    const taskData = {
        id: props.id,
        title: props.title,
        status: status.value,
    };

    console.log(taskData)

    try {
        const response = await axios.put(`http://localhost:3000/task/`, taskData);
        emit('updateTaskList')
    } catch (error) {
        console.error(error);
    }
}

const deleteTask = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/task/${props.id}`);
        emit('updateTaskList')
    } catch (error) {
        console.error(error);
    }
}

// Format the due date to a human-readable format
const formattedDueDate = computed(() => {
  if (props.due) {
    return props.due.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  return ''
});


const updateTaskList = () => {
    emit('updateTaskList')
}

</script>

<template>
    <div class="w-full rounded-lg border p-5 flex items-center justify-between">
        <div class="flex items-center">
            <Checkbox class="mr-5" v-on:update:checked="toggleStatus" v-model:checked="props.status"/>
            <div class="flex flex-col">
                <h1 class="font-semibold">{{ props.title }}</h1>
                <h1 class="text-sm dark:text-slate-400 text-gray-600">{{ props.due ? `Due on ${formattedDueDate}` : 'No due date' }}</h1>
            </div>
        </div>
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="outline" size="icon">
                    <Trash2 class="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete task confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this task? <br />
                        You cannot undo this action.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="deleteTask">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>